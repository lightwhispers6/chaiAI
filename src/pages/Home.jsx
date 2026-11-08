import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import workshops, { seriesIntro, stageOf, statusLabelOf, shortDate, nextOpen, doneList, voteThemes } from '../data/workshops'

const pains = [
  { q: '书读了不少，真要讲给别人听就卡壳', a: '读过不等于讲得出。中间缺的不是记性，是把书拆成一条能讲下去的线。' },
  { q: '想做一门课，大纲写了两页就写不下去', a: '大纲不是目录。它得是一条学习路径：先讲什么、后讲什么、哪里停下来练。' },
  { q: '课件做完了，却不敢定价、不敢卖', a: '课不是知识的搬运。它得是可验收的交付物，才有人愿意付钱。' },
  { q: '讲完一期很热闹，下一期又从零开始', a: '没有沉淀成方法论，就永远在做一次性生意。' },
]

const chaifa = [
  { k: '拆书', d: '拆一本书里真正能用的那几段——不是摘金句，是找出读者行为会因此改变的地方。', icon: 'M4 7c0-1.66 3.58-3 8-3s8 1.34 8 3-3.58 3-8 3-8-1.34-8-3zm0 5c0 1.66 3.58 3 8 3s8-1.34 8-3m-16 5c0 1.66 3.58 3 8 3s8-1.34 8-3' },
  { k: '拆课', d: '沿用 RIA 便签法：R 找到原文真正的关键片段，I 用自己的话重述成能讲的点，A 排成学员的下一步动作。', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { k: '成课', d: '交出一套能开课的资产：大纲、课件、练习、验收标准。不是听完就散，是拿走就能开讲。', icon: 'M16 7l-4 4-4-4m8 6l-4 4-4-4' },
]

// 八大模块全景（与导航同序：拆成长→拆经典→拆指南→拆搭子→拆软件→拆技能→拆专家→共拆AI；数字=站内真实资产）
const modules = [
  { k: '拆成长', emoji: '🧭', d: '三级九拆过级路线，33 个官方技能点逐项拆解', stat: '33 个', statLabel: '技能点 · TF1-1~TF3-3', href: '/learning-path', tile: 'bg-indigo-500/10', num: 'text-indigo-600' },
  { k: '拆经典', emoji: '📖', d: '2255 本致用经典热拆库，1713 本已有拆页', stat: '1713 本', statLabel: '已有拆页 · 全库 2255 本', href: '/hot', tile: 'bg-rose-500/10', num: 'text-rose-600' },
  { k: '拆指南', emoji: '📚', d: 'RIA 便签法全库共拆，六大兴趣模块连读', stat: '2255 本', statLabel: '19262 页拆页全库', href: 'https://www.aibay.asia/chailive/', tile: 'bg-teal-500/10', num: 'text-teal-600' },
  { k: '拆搭子', emoji: '🤝', d: '5473 位拆书家名录，按城市/标签匹配搭子', stat: '5473 人', statLabel: '83 分舵 · 7 种合作模式', href: '/chaibuddy', tile: 'bg-amber-500/10', num: 'text-amber-600' },
  { k: '拆软件', emoji: '🖥️', d: '工作坊当场拆开真 AI 软件，接回你的产线', stat: '4 期', statLabel: '真实软件 · 场场有产出', href: '/workshops', tile: 'bg-sky-500/10', num: 'text-sky-600' },
  { k: '拆技能', emoji: '⚡', d: '每个技能拆成便签+信息图+可下载 Skill', stat: '210 个', statLabel: '技能拆解 · 全部可下载', href: '/skills', tile: 'bg-violet-500/10', num: 'text-violet-600' },
  { k: '拆专家', emoji: '🧠', d: '思想家蒸馏成可召唤的领域 AI 专家团', stat: '8 套', statLabel: '思想体系 · 6 个专家团', href: '/skill-fusion', tile: 'bg-fuchsia-500/10', num: 'text-fuchsia-600' },
  { k: '共拆AI', emoji: '🚀', d: '六条合作线全部开放，带着你的领域加入', stat: '6 条线', statLabel: '开源共建 · 挑一条进', href: '/coai', tile: 'bg-emerald-500/10', num: 'text-emerald-600' },
]

export default function Home() {
  const nx = nextOpen()
  const done = doneList()
  // spotlight 焦点：优先下一场报名中的；全交付完则落最新已交付场（材料回看）；再退首场
  const first = nx || done[done.length - 1] || workshops[0]
  const rest = workshops.filter(w => w.id !== first.id)

  return (
    <div className="hero-wash">
      {/* ==================== Hero ==================== */}
      <section className="pt-36 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="eyebrow mb-4">拆书成课 · 内容策划师 annie</div>
            <h1 className="headline text-[44px] md:text-[64px] mb-6">
              一本书，<br />
              <span className="gradient-text">拆成一门能交付的课。</span>
            </h1>
            <p className="text-[17px] md:text-[19px] leading-relaxed text-[#5f5870] max-w-2xl mx-auto mb-9">
              我不做知识搬运。一本书到手，先拆出真正能改变行为的那几段，
              再排成一条走得通的学习路径，最后做成一套拿得出手、卖得动、能被验收的课程。
              从「读过」到「讲得出」，中间那一步，我做。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href={first.link} className="btn-primary">
                {nx ? '报名工作坊 →' : '回看课程材料 →'}
              </a>
              <Link to="/workshops" className="btn-secondary">
                看全部主题 & 投票 →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== 学习者痛点 ==================== */}
      <section className="py-20 px-4 bg-white border-y border-black/[.05]">
        <div className="max-w-5xl mx-auto">
          <div className="eyebrow mb-3 text-center">从你出发</div>
          <h2 className="headline text-[30px] md:text-[38px] text-center mb-12">这些卡点，是不是很熟悉？</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {pains.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="apple-card p-6"
              >
                <div className="text-[16px] font-semibold text-[#241f38] mb-2.5">“{p.q}”</div>
                <div className="text-[14px] leading-relaxed text-[#5f5870]">{p.a}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 拆法 RIA 重释 ==================== */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="eyebrow mb-3 text-center">怎么拆</div>
          <h2 className="headline text-[30px] md:text-[38px] text-center mb-4">拆的是书，成的是课</h2>
          <p className="text-center text-[#5f5870] text-[15px] mb-12 max-w-2xl mx-auto">
            把一本书，变成你的课程资产。
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {chaifa.map((c, i) => (
              <motion.div
                key={c.k}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="apple-card p-7 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-[#6c60cc]/[.08] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#6c60cc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
                  </svg>
                </div>
                <div className="text-[18px] font-bold text-[#241f38] mb-2.5">{c.k}</div>
                <div className="text-[13.5px] leading-relaxed text-[#5f5870]">{c.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 八大模块全景 ==================== */}
      <section className="py-24 px-4 bg-[#f5f1e8] border-y border-black/[.05]">
        <div className="max-w-6xl mx-auto">
          <div className="eyebrow mb-3 text-center">站点全景 · 一图看懂</div>
          <h2 className="headline text-[30px] md:text-[40px] text-center mb-4">
            八个模块，一条<span className="gradient-text">「拆」的进阶线</span>
          </h2>
          <p className="text-center text-[#5f5870] text-[15px] mb-14 max-w-2xl mx-auto">
            从三级九拆的过级路，到全库共拆、找到搭子、拆开真软件、长出技能、召唤专家——最后加入共建。
            每一站都有真实数字在跑，不摆概念。
          </p>
          <div className="relative">
            <div className="hidden lg:block absolute top-[46px] left-[12%] right-[12%] h-[2px] rounded-full bg-gradient-to-r from-indigo-400/50 via-teal-400/50 to-fuchsia-400/50" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {modules.map((m, i) => (
                <motion.div
                  key={m.k}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.09 }}
                >
                  <a href={m.href} className="group block h-full apple-card p-5 !shadow-sm">
                    <div className="flex lg:justify-center mb-4">
                      <div className={`relative w-12 h-12 rounded-2xl ${m.tile} flex items-center justify-center text-2xl`}>
                        {m.emoji}
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border border-black/10 text-[9px] font-bold text-[#9990a8] flex items-center justify-center shadow-sm">{i + 1}</span>
                      </div>
                    </div>
                    <div className="text-[17px] font-black text-[#241f38] mb-1 lg:text-center">{m.k}</div>
                    <div className="text-[11.5px] leading-snug text-[#5f5870] mb-4 lg:text-center">{m.d}</div>
                    <div className="lg:text-center">
                      <div className={`text-[22px] font-black leading-none ${m.num}`}>{m.stat}</div>
                      <div className="text-[10px] text-[#9990a8] mt-1.5 tracking-wide">{m.statLabel}</div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-10 text-center">
            <a href="/coai" className="text-[13px] font-semibold text-[#6c60cc] hover:text-[#241f38] transition-colors">
              六条合作线怎么选 → 看共拆AI 专页
            </a>
          </div>
        </div>
      </section>

      {/* ==================== 工作坊主题 ==================== */}
      <section className="py-20 px-4 bg-[#f5f1e8]">
        <div className="max-w-5xl mx-auto">
          <div className="eyebrow mb-3 text-center">工作坊全系列</div>
          <h2 className="headline text-[30px] md:text-[38px] text-center mb-4">{nx ? `${shortDate(nx)}开课，` : '课程持续开，'}<span className="gradient-text">其余你说了算</span></h2>
          <p className="text-center text-[#5f5870] text-[15px] mb-12 max-w-3xl mx-auto">{seriesIntro}</p>

          {/* 首场 spotlight */}
          <div className="apple-card p-8 mb-4 border-[#6c60cc]/25 shadow-[0_10px_36px_rgba(108,96,204,.10)]">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6c60cc]/10 text-[#6c60cc] text-[12px] font-semibold mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6c60cc] animate-pulse" />
                  {statusLabelOf(first)}
                </div>
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  <span className="text-[11px] text-[#9990a8] font-semibold tracking-wide">拆的软件</span>
                  {first.tools.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-[#241f38] text-white text-[12px] font-bold tracking-wide">{t}</span>
                  ))}
                </div>
                <h3 className="text-[26px] font-bold text-[#241f38] tracking-tight">{first.title}</h3>
                <p className="text-[#5f5870] text-[15px] mt-2 max-w-xl">{first.short}</p>
              </div>
              <a href={stageOf(first) === 'open' ? (first.signupUrl || first.link) : first.link} target={stageOf(first) === 'open' ? '_blank' : undefined} rel="noreferrer" className="btn-primary shrink-0">{stageOf(first) === 'open' ? '立即报名' : '材料回看'}</a>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                ['时间', first.date],
                ['地点', first.location],
                ['费用', first.fee],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-[#f5f1e8] px-4 py-3">
                  <div className="text-[11px] text-[#9990a8] font-semibold mb-0.5">{k}</div>
                  <div className="text-[13px] text-[#241f38] leading-snug">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 02-04 期 compact */}
          <div className="grid md:grid-cols-3 gap-4">
            {rest.map((w, i) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <a href={w.link} className="apple-card p-6 block h-full hover:shadow-[0_12px_32px_rgba(0,0,0,.08)] transition-shadow">
                  <div className="inline-flex px-2.5 py-0.5 rounded-full bg-black/[.05] text-[#9990a8] text-[11.5px] font-semibold mb-3">{statusLabelOf(w)}</div>
                  <div className="text-[17px] font-bold text-[#241f38] mb-1.5">{w.title}</div>
                  <p className="text-[13.5px] text-[#5f5870] leading-relaxed mb-3">{w.short}</p>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {w.tools.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-[#241f38] text-white text-[12px] font-bold tracking-wide">{t}</span>
                    ))}
                  </div>
                </a>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/workshops" className="btn-secondary">{voteThemes.length} 个主题 · 点「我支持」投票 →</Link>
          </div>
        </div>
      </section>

      {/* ==================== 三个带走 ==================== */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="eyebrow mb-3 text-center">验收标准</div>
          <h2 className="headline text-[30px] md:text-[38px] text-center mb-12">只认一个标准：你能不能开讲</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              ['拆得开', '一本书不是从第一页读起，是先找到它真正的骨架。拆不开的书，讲出来一定是流水账。'],
              ['排得顺', '大纲是一条路径，不是一份目录。哪一步该讲、哪一步该练、哪里该停，都有讲究。'],
              ['交得出', '最后落到一份能直接用的东西：课件、练习、验收标准，拿到手就能开讲。'],
            ].map(([t, d], i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="text-center px-4"
              >
                <div className="text-[34px] font-bold gradient-text mb-3">0{i + 1}</div>
                <div className="text-[18px] font-bold text-[#241f38] mb-2">{t}</div>
                <div className="text-[13.5px] leading-relaxed text-[#5f5870]">{d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-20 px-4 bg-white border-t border-black/[.05]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="headline text-[28px] md:text-[36px] mb-4">手里有一本书，想把它变成你的课？</h2>
          <p className="text-[#5f5870] text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
            告诉我书名，再告诉我你打算讲给谁听。我先给你一份拆解思路——哪几章是真骨架、哪些可以砍掉、第一节课该从哪里开。
          </p>
          <div className="flex flex-col items-center gap-4">
            <img
              src="/images/wechat-qr.png"
              alt="annie 微信二维码"
              className="w-[168px] rounded-xl bg-white p-2 border border-[#e7e0d2] shadow-[0_8px_24px_rgba(36,31,56,.08)]"
            />
            <div className="text-center">
              <div className="text-[12.5px] text-[#9990a8] mb-1">扫码加微信</div>
              <div className="text-[16px] font-semibold text-[#6c60cc]">happyannie626</div>
            </div>
            <a href={nx ? first.link : '/workshops'} className="text-[13px] text-[#6c60cc] hover:underline">{nx ? `了解第 ${parseInt(first.no, 10)} 期课程 →` : '看全部课程与材料回看 →'}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
