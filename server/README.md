# 联系表单后端（chaiAI Contact Server）

访客在官网 `/contact` 页面提交表单 → 本服务通过 **QQ 邮箱 SMTP** 把留言发到 `annieannie0626@qq.com`。
授权码只保存在服务器环境变量里，前端代码零暴露。

## 当前线上部署（WorkBuddy 托管）

- 后端地址：`https://chaishu-contact.app.workbuddy.host`（API 调用需带分享码参数，完整地址已写在前端 `src/pages/Contact.jsx` 里）
- 前端 `Contact.jsx` 的 API 地址优先级：`VITE_CONTACT_API` 环境变量 > 本地开发代理 > 上述线上地址
- 管理入口：WorkBuddy「设置 → 数据管理 → 应用」，可查看/下线该服务
- 注意：该托管适合轻量使用。如未来访问量增大或需要常驻服务，可按下方 Render 方案迁移，迁移后只需改前端一处地址

## 本地运行

```bash
cd server
npm install
cp .env.example .env   # 然后编辑 .env 填入授权码
npm run dev            # 默认监听 :3001
```

配合前端：另开终端在项目根目录 `npm run dev`，vite 会把 `/api` 代理到 `:3001`。

## 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET  | `/api/health` | 健康检查 |
| POST | `/api/contact` | 提交留言，body: `{ name, email, message, website? }` |

安全机制：字段校验 / 每 IP 15 分钟限 5 次 / 蜜罐反机器人 / CORS 白名单。

## 部署（以 Render 免费方案为例）

1. 代码推送到 GitHub 后，打开 [render.com](https://render.com) → New → Web Service → 连接本仓库
2. 配置：
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
3. 在 Environment 里添加环境变量（**不要**写进代码）：

   | Key | Value |
   |-----|-------|
   | `QQ_SMTP_USER` | `annieannie0626@qq.com` |
   | `QQ_SMTP_PASS` | QQ 邮箱 SMTP 授权码 |
   | `MAIL_TO` | `annieannie0626@qq.com` |
   | `ALLOWED_ORIGINS` | `https://lightwhispers6.github.io` |

4. 部署完成后拿到后端域名（如 `https://xxx.onrender.com`），
   在 GitHub 仓库 **Settings → Secrets and variables → Actions → Variables** 添加：
   - `VITE_CONTACT_API` = `https://xxx.onrender.com/api/contact`

   这样 GitHub Actions 构建前端时会把接口地址注入（需要在 deploy.yml 的 build 步骤加 `env: VITE_CONTACT_API: ${{ vars.VITE_CONTACT_API }}`）。

> ⚠️ Render 免费实例 15 分钟无请求会休眠，首次提交留言可能慢 30 秒左右唤醒，属正常现象。
> ⚠️ 授权码变更后只需更新 Render 环境变量，无需改代码。
