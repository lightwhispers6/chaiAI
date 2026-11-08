import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'

const app = express()
const PORT = process.env.PORT || 3001

// ---------- 配置校验 ----------
const QQ_USER = process.env.QQ_SMTP_USER // 例如 annieannie0626@qq.com
const QQ_PASS = process.env.QQ_SMTP_PASS // QQ 邮箱 SMTP 授权码（不是 QQ 密码）
const MAIL_TO = process.env.MAIL_TO || QQ_USER // 留言接收邮箱，默认发给自己

if (!QQ_USER || !QQ_PASS) {
  console.error('[contact-server] 缺少环境变量 QQ_SMTP_USER / QQ_SMTP_PASS，服务退出')
  process.exit(1)
}

// ---------- CORS：只允许自己的站点调用 ----------
// 多个来源用英文逗号分隔，例如：
// ALLOWED_ORIGINS=https://lightwhispers6.github.io,http://localhost:5173
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

app.use(
  cors({
    origin(origin, cb) {
      // 无 Origin 头（curl / 服务器间调用）或在白名单内则放行
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
      return cb(new Error('Not allowed by CORS'))
    },
    methods: ['POST'],
  })
)

app.use(express.json({ limit: '20kb' }))

// ---------- 限流：同一 IP 15 分钟内最多 5 次 ----------
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: '提交太频繁了，请 15 分钟后再试' },
})

// ---------- 邮件发送通道 ----------
const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true, // SSL
  auth: { user: QQ_USER, pass: QQ_PASS },
})

transporter
  .verify()
  .then(() => console.log('[contact-server] QQ SMTP 连接验证通过'))
  .catch((err) => console.error('[contact-server] QQ SMTP 验证失败：', err.message))

// ---------- 工具 ----------
const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]))

// ---------- 路由 ----------
app.get('/api/health', (req, res) => res.json({ ok: true }))

app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, message, website } = req.body || {}

  // 蜜罐字段：正常用户看不到不填写，机器人填了就静默丢弃
  if (website) return res.json({ ok: true })

  // 校验
  const errors = {}
  if (typeof name !== 'string' || !name.trim() || name.trim().length > 50)
    errors.name = '请填写称呼（50 字以内）'
  if (typeof email !== 'string' || !isEmail(email.trim()))
    errors.email = '请填写正确的邮箱地址'
  if (typeof message !== 'string' || !message.trim() || message.trim().length > 2000)
    errors.message = '请填写留言内容（2000 字以内）'
  if (Object.keys(errors).length)
    return res.status(400).json({ ok: false, errors })

  const cleanName = name.trim()
  const cleanEmail = email.trim()
  const cleanMessage = message.trim()

  try {
    await transporter.sendMail({
      from: `"拆书成课官网" <${QQ_USER}>`,
      to: MAIL_TO,
      replyTo: cleanEmail,
      subject: `【官网留言】${cleanName}`,
      text: `称呼：${cleanName}\n邮箱：${cleanEmail}\n时间：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}\n\n留言内容：\n${cleanMessage}`,
      html: `
        <div style="font-family:-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;max-width:560px;margin:0 auto;padding:24px">
          <h2 style="color:#241f38;font-size:18px;margin:0 0 16px">拆书成课官网 · 新留言</h2>
          <table style="font-size:14px;color:#5f5870;border-collapse:collapse">
            <tr><td style="padding:4px 12px 4px 0;color:#9990a8">称呼</td><td>${escapeHtml(cleanName)}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#9990a8">邮箱</td><td><a href="mailto:${escapeHtml(cleanEmail)}">${escapeHtml(cleanEmail)}</a></td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#9990a8">时间</td><td>${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f5f1e8;border-radius:12px;font-size:14px;line-height:1.8;color:#241f38;white-space:pre-wrap">${escapeHtml(cleanMessage)}</div>
          <p style="font-size:12px;color:#9990a8;margin-top:16px">直接回复本邮件即可回到访客邮箱（Reply-To 已设置为访客地址）。</p>
        </div>`,
    })
    res.json({ ok: true })
  } catch (err) {
    console.error('[contact-server] 发送失败：', err.message)
    res.status(502).json({ ok: false, error: '邮件发送失败，请稍后再试，或直接加微信 happyannie626 联系' })
  }
})

app.listen(PORT, () => {
  console.log(`[contact-server] listening on :${PORT}`)
})
