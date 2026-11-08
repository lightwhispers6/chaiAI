import { useState } from 'react'

// 后端接口地址：本地开发默认 /api/contact（配合 vite 代理），
// 线上在 .env 里配置 VITE_CONTACT_API=https://你的后端域名/api/contact
const API_URL = import.meta.env.VITE_CONTACT_API || '/api/contact'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((er) => ({ ...er, [key]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (status === 'sending') return

    // 前端基础校验
    const er = {}
    if (!form.name.trim()) er.name = '请填写称呼'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) er.email = '请填写正确的邮箱地址'
    if (!form.message.trim()) er.message = '请填写留言内容'
    if (Object.keys(er).length) return setErrors(er)

    setStatus('sending')
    setServerError('')
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '', website: '' })
      } else {
        setStatus('error')
        if (data.errors) setErrors(data.errors)
        setServerError(data.error || '发送失败，请稍后再试')
      }
    } catch {
      setStatus('error')
      setServerError('网络异常，请稍后再试，或直接加微信 happyannie626 联系')
    }
  }

  const inputCls = (hasErr) =>
    `w-full px-4 py-3 rounded-xl border bg-white text-[14px] text-[#241f38] placeholder-[#b6aec4] outline-none transition-colors focus:border-[#6c60cc] focus:ring-2 focus:ring-[#6c60cc]/15 ${
      hasErr ? 'border-[#d45b5b]' : 'border-[#e7e0d2]'
    }`

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-20">
      <div className="max-w-xl mx-auto">
        <h1
          className="text-[28px] md:text-[34px] font-bold text-[#241f38] tracking-tight"
          style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.04em' }}
        >
          联系我
        </h1>
        <p className="mt-3 text-[14px] leading-relaxed text-[#5f5870]">
          想约工作坊、聊拆课合作，或单纯打个招呼？填写下面的表单，内容会直接发到我的邮箱，我会尽快回复。
        </p>
        <p className="mt-2 text-[13px] text-[#9990a8]">
          也可以直接加微信 <span className="text-[#6c60cc] font-medium">happyannie626</span>
        </p>

        {status === 'success' ? (
          <div className="mt-10 rounded-2xl border border-[#e7e0d2] bg-[#f5f1e8] p-8 text-center">
            <div className="text-[40px]">📮</div>
            <div className="mt-2 text-[17px] font-semibold text-[#241f38]">留言已送达</div>
            <p className="mt-2 text-[13px] text-[#5f5870] leading-relaxed">
              感谢你的来信，我会尽快通过你留下的邮箱回复。
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 px-5 py-2 rounded-full text-[13.5px] font-semibold bg-[#6c60cc] text-white hover:bg-[#7d72d6] transition-colors"
            >
              再写一条
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-5" noValidate>
            {/* 蜜罐字段：对真人不可见，防机器人 */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={update('website')}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div>
              <label htmlFor="contact-name" className="block text-[13px] font-medium text-[#241f38] mb-1.5">
                怎么称呼你 <span className="text-[#d45b5b]">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                maxLength={50}
                placeholder="你的名字 / 昵称"
                value={form.name}
                onChange={update('name')}
                className={inputCls(errors.name)}
              />
              {errors.name && <p className="mt-1 text-[12px] text-[#d45b5b]">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-[13px] font-medium text-[#241f38] mb-1.5">
                你的邮箱 <span className="text-[#d45b5b]">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="用于接收我的回复"
                value={form.email}
                onChange={update('email')}
                className={inputCls(errors.email)}
              />
              {errors.email && <p className="mt-1 text-[12px] text-[#d45b5b]">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-[13px] font-medium text-[#241f38] mb-1.5">
                想说的话 <span className="text-[#d45b5b]">*</span>
              </label>
              <textarea
                id="contact-message"
                rows={6}
                maxLength={2000}
                placeholder="合作意向、课程咨询、或任何想聊的……"
                value={form.message}
                onChange={update('message')}
                className={`${inputCls(errors.message)} resize-y min-h-[140px]`}
              />
              <div className="mt-1 flex justify-between">
                {errors.message ? (
                  <p className="text-[12px] text-[#d45b5b]">{errors.message}</p>
                ) : (
                  <span />
                )}
                <span className="text-[11px] text-[#b6aec4]">{form.message.length}/2000</span>
              </div>
            </div>

            {status === 'error' && serverError && (
              <p className="text-[13px] text-[#d45b5b]">{serverError}</p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full md:w-auto px-8 py-3 rounded-full text-[14px] font-semibold bg-[#6c60cc] text-white hover:bg-[#7d72d6] transition-colors shadow-[0_4px_14px_rgba(108,96,204,.3)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? '发送中…' : '发送留言'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
