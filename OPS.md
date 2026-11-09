# 站点运维手册（改站从这里开始）

> 这份文件是给"未来的自己"和"接手改站的人/AI"看的。
> 换电脑、重装系统、隔几个月回来，先读这里，不要从零摸索。

## 一、基本信息

| 项 | 值 |
|---|---|
| 仓库 | `lightwhispers6/chaiAI`（public，fork 自讲师站） |
| 线上地址 | https://lightwhispers6.github.io/chaiAI/ |
| 技术栈 | Vite 8 + React 19 + React Router 7 + Tailwind CSS 4 + framer-motion |
| 部署 | push 到 `main` → GitHub Actions 自动构建 → Pages 发布（约 2–4 分钟） |
| 构建命令 | `npm run build`（vite build 后把 index.html 复制成 404.html 和 chaibuddy/index.html） |
| 站点标题 | 拆书成课 — 把一本书，拆成一门能交付的课 \| annie |

## 二、重要：这个站部署在子路径 `/chaiAI/` 下

`vite.config.js` 里 `base: '/chaiAI/'`。所以：

- **绝对路径会 404**。写 `/images/logo.png` 会指向 `lightwhispers6.github.io/images/logo.png`（域名根），必须写 `${import.meta.env.BASE_URL}images/logo.png`。
- 站内跳转也走 base：`<Link>` 由 React Router 自动处理；`<a href>` 手写必须加前缀。
- `BrowserRouter` 已加 `basename={import.meta.env.BASE_URL}`，别删。
- 本地开发时访问 `http://localhost:5173/chaiAI/`（带前缀）。

2026-11-09 曾因这条踩过大坑：logo、二维码、8 张模块卡、5 处硬跳转全部 404。改完记得回归检查图片。

## 三、改哪里（内容地图）

### 页面（`src/pages/`，一个文件一页）

| 页面 | 文件 | 说明 |
|---|---|---|
| 首页 | `Home.jsx` | 开场标题；`modules` 数组是"七大模块"卡片（文字/数字/链接） |
| 拆经典（书单） | `HotBooks.jsx` / `HotBookDetail.jsx` | 数据在 `src/data/hotBooks.js` + `public/hot/index.json` |
| 拆技能 | `Skills.jsx` | 数据在 `src/data/skills.js` |
| 拆成长（过级路线） | `LearningPath.jsx` | 数据在 `src/data/learningPath.js` |
| 拆搭子 | `Chaibuddy.jsx`（49KB，本站最大页） | `MODES` = 六种合作模式；`projects` = 项目阵地卡片 |
| 拆软件/技能融合 | `SkillFusion.jsx` | 数据在 `src/data/skillFusion.js` |
| 拆AI营 | `Camp.jsx` | 线上营，链接多为外站 |
| 工作坊 | `Workshops.jsx` | 数据在 `src/data/workshops.js` |
| 共拆AI | `Coai.jsx` | 合作模式入口页 |
| 关于我 / 联系我 | `About.jsx` / `Contact.jsx` | 含微信二维码 |

### 全局

| 想改 | 文件 |
|---|---|
| 导航菜单项 | `src/components/Navbar.jsx` |
| 页脚 | `src/components/Footer.jsx` |
| **全站配色 / 字体** | `src/index.css` 顶部 `@theme` 块 |
| 路由表 | `src/App.jsx` |
| 图片 | `public/images/`（同名覆盖即可） |

### 换肤只要改一行

`src/index.css`：

```css
--color-brand: #6c60cc;   /* 主色紫，取自 logo 主体 */
--color-accent: #efb324;  /* 强调黄，取自 logo 箭头与书本 */
--color-paper: #faf7ef;   /* 底色暖米白 */
```

改这三个值全站换装。旧 token 名（`neon-purple`、`dark-bg` 等）是历史遗留，保留着指向新值，不要删。

### 静态子站（`public/` 下）

`chailive/` `tf-assess/` `workbook/` `shifu/` `cards/` `skills/` `workshop/` `chai-for-live/`
这些是纯 HTML 子站，改完 push 直接生效，不经过 React 构建。

注意：`cards/` 和 `skills/` 里**没有 index.html**，所以 `/cards/`、`/skills/` 必然 404（GitHub Pages 不支持目录列表）。已在 2026-11-09 删掉指向它们的按钮，别再加回来。

## 四、三种改法

1. **网页改**：GitHub 打开文件 → 铅笔 → 改引号里的中文 → Commit。适合纯文案。改坏了构建失败，线上保持上一版，不会白屏。
2. **本地改**：`npm install` → `npm run dev` → 改 → `git push`。改排版必须用这条，能实时看效果。
3. **让 AI 改**：把需求说清楚（哪页、哪句、改成什么），走"API 拉源码 → 本地改 → esbuild 语法预检 → Git Data API 单 commit 推送"，不用克隆整个仓库（仓库 365MB，浅克隆也可能超时）。

## 五、常见故障对照

| 现象 | 原因 |
|---|---|
| 图片 404 | 用了绝对路径，缺 `BASE_URL` 前缀 |
| 深层链接（如 `/skills`）直接打开 404 | GitHub Pages 无 SPA 回退，靠 `404.html`（= index.html 副本）接管，页面能渲染但 HTTP 状态是 404，属已知限制 |
| 点进去 404 | 链接指向不存在的静态目录，或指向外站旧地址 |
| push 后站点没变 | 看 Actions 是否构建失败；成功则等 2–4 分钟或强刷 Ctrl+Shift+R |
| 写 `.github/workflows/` 报 404 | token 缺 `workflow` scope（GitHub 用 404 掩盖 403） |

## 六、别做的事

- **别点 "Sync fork"**：会把本站改动冲掉。上游有更新时手动挑需要的。
- **别删 `basename`**：删了所有子页面刷新即 404。
- **别在网页编辑器里手改大数据文件**（`hotBooks.js` 271KB、`people.json` 1MB）：少一个逗号整页白屏。

## 七、改动记录

| 日期 | commit | 内容 |
|---|---|---|
| 2026-11-09 | `6d28457` | 修子路径 base 导致的全站资源/链接 404（9 文件）；移除「拆指南」导航与模块 |
| 2026-11-09 | `34a73fb` | 删 Skills 页两个失效按钮、删 Chaibuddy 的 chailive 项目卡 |

## 八、遗留待办

- 仍有 4 处链接指向讲师站 `aibay.asia`（Chaibuddy 合作模式「全库共拆」、chaibuddy 项目「单文件浏览器」、Coai 页「全库共拆」、Camp 页下载链接），未确认是否移除。
- 每日巡检：`scripts/site_check.py` 已入库，7 项检查全过；`.github/workflows/site-check.yml` 因 token 缺 `workflow` scope 未能推送，需网页上传后才会每天自动跑。
