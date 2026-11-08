import { useState } from 'react'
import { motion } from 'framer-motion'
import { skillSources, fusionPacks } from '../data/skillFusion'

const BASE = import.meta.env.BASE_URL || '/'

const catColors = {
  '东方智慧': 'border-emerald-500/30 from-emerald-500/10 to-transparent',
  '思维方法': 'border-violet-500/30 from-violet-500/10 to-transparent',
  '战略方法': 'border-red-500/30 from-red-500/10 to-transparent',
  '投资智慧': 'border-amber-500/30 from-amber-500/10 to-transparent',
}

const catAccents = {
  '东方智慧': 'text-emerald-400',
  '思维方法': 'text-violet-400',
  '战略方法': 'text-red-400',
  '投资智慧': 'text-amber-400',
}

function dl(url, name) {
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function dlTar(sourceId) {
  // 知本创业法 use sub-category tars
  if (sourceId === 'book2startup') {
    // Don't have a single tar for all - handled per category
    return
  }
  dl(`${BASE}skills/${sourceId}.tar.gz`, `${sourceId}.tar.gz`)
}

function dlSubTar(categorySlug) {
  dl(`${BASE}skills/book2startup-${categorySlug}.tar.gz`, `book2startup-${categorySlug}.tar.gz`)
}

function dlSkill(sourceId, slug) {
  // book2startup entries are categories, use sub-tar instead
  if (sourceId === 'book2startup') {
    dlSubTar(slug)
    return
  }
  dl(`${BASE}skills/${sourceId}/${slug}.md`, `${sourceId}-${slug}.md`)
}

function dlFusion(name, id) {
  const encoded = encodeURIComponent(name)
  dl(`${BASE}skills/fusion-packs/${encoded}.md`, `${id}.md`)
}

export default function SkillFusion() {
  const [expandedId, setExpandedId] = useState(null)
  const [expandedPack, setExpandedPack] = useState(null)
  const [tab, setTab] = useState('sources')

  const total = skillSources.reduce((s, src) => s + src.skills.length, 0)

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black mb-3">
            <span className="gradient-text">拆专家工坊</span>
          </h1>
          <p className="text-[#5f5870] text-lg max-w-2xl mx-auto">
            把思想家蒸馏成可召唤的 AI 专家：<span className="text-neon-purple font-bold">8</span> 套思想体系、<span className="text-neon-purple font-bold">{total}</span> 个技能、<span className="text-neon-purple font-bold">6</span> 个专家团 — 全部本站直接下载
          </p>
          <p className="text-[#9990a8] text-sm max-w-3xl mx-auto mt-4 leading-relaxed">
            以《毛泽东选集》为示范：把原著蒸馏成矛盾分析、调查研究等技能与工作流，结合毛选拆书精华，
            让教员思想落到你的真实决策与执行里。未来这些专家将进入
            <span className="text-[#241f38] font-medium"> WorkBuddy</span>，随时召唤调用。
          </p>
        </div>

        {/* Workshop Section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 md:p-10 border border-dark-border relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-red-500/10 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500/10 to-amber-500/10 border border-red-500/20 text-red-600 text-sm">
                新工作坊 · 定档后开放报名
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-[#241f38] mb-3">拆专家工作坊 · 本期拆《毛泽东选集》</h2>
              <p className="text-[#5f5870] max-w-3xl mb-8">
                不换书、不多吃——<b className="text-[#241f38]">就吃透这一个理论的 AI 化</b>。现场拆讲师做好的毛选技能包（矛盾分析、调查研究、战略方法……怎么从原著长出来），再按<b className="text-[#241f38]">你自己的需求</b>调教它：拆为己用，让毛选专家陪你打仗、陪你复盘、陪你成长。
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="p-5 rounded-xl bg-dark-card-hover/50 border border-dark-border">
                  <div className="text-xs text-red-600 font-semibold mb-2">拆 · 讲师的毛选技能包</div>
                  <div className="text-sm font-bold text-[#241f38]">20+ 套方法全打开</div>
                  <p className="text-xs text-[#9990a8] mt-2">本页可直接下载的毛选技能就是现场教材：矛盾分析、调查研究怎么从《矛盾论》《反对本本主义》一节一节蒸馏成 SKILL.md，当堂拆给你看。</p>
                </div>
                <div className="p-5 rounded-xl bg-dark-card-hover/50 border border-dark-border">
                  <div className="text-xs text-red-600 font-semibold mb-2">调 · 按你的需求改造</div>
                  <div className="text-sm font-bold text-[#241f38]">把专家对准你的战场</div>
                  <p className="text-xs text-[#9990a8] mt-2">把毛选专家对准你眼前的事——带团队、做决策、打市场：教它你的语境、你的约束、你的对手，越用越懂你，不是通用答案，是<b>你的</b>答案。</p>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-red-500/10 to-amber-500/10 border border-red-500/30">
                  <div className="text-xs text-red-600 font-semibold mb-2">用 · 上矩阵陪伴成长</div>
                  <div className="text-sm font-bold text-[#241f38]">从「点开才在」到「全天在岗」</div>
                  <p className="text-xs text-[#9990a8] mt-2">调教好的专家接上工作流——每晚用矛盾分析陪你复盘、每周五用持久战三阶段校你的节奏、成长台账自动记，卡了会喊你。</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-xs font-semibold text-[#9990a8] tracking-widest mb-3">带走三样</div>
                  <ul className="space-y-2 text-sm text-[#4a4458]">
                    <li className="flex gap-2"><span className="text-red-600 font-bold">①</span>拆懂「原著 → 技能」的蒸馏全过程（选段 → 提方法 → 定步骤 → 写护栏），吃透这一个理论怎么 AI 化</li>
                    <li className="flex gap-2"><span className="text-red-600 font-bold">②</span>一个按你需求调教过的毛选专家：你的语境、你的战场，发到你自己的 GitHub 仓（现场发出去）</li>
                    <li className="flex gap-2"><span className="text-red-600 font-bold">③</span>一条上了矩阵的陪伴工作流：每日复盘 · 每周校奏 · 成长台账，专家一直陪着你</li>
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#9990a8] tracking-widest mb-3">适合谁</div>
                  <ul className="space-y-2 text-sm text-[#4a4458]">
                    <li>读过毛选、想让方法真正落到自己决策里的人</li>
                    <li>有具体战场（带团队 / 做项目 / 打市场），想拆为己用的人</li>
                    <li>想要一个越用越懂自己的 AI 陪跑专家的人</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => { try { navigator.clipboard?.writeText('happyannie626') } catch (e) {} }}
                  className="px-5 py-2.5 rounded-xl bg-[#6c60cc] text-white text-sm font-semibold hover:bg-[#7d72d6] transition-all"
                  title="点击复制微信号"
                >
                  定档早知道 · 微信 happyannie626 📋
                </button>
                <span className="text-xs text-[#9990a8]">时间地点定档后，报名帖发拆书帮公众号 · 12 人小班</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Workshop Section 2: First Principles */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 md:p-10 border border-dark-border relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-violet-500/10 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 text-violet-600 text-sm">
                下一期 · 拆专家工作坊
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-[#241f38] mb-3">拆专家工作坊 · 下期拆《第一性原理》</h2>
              <p className="text-[#5f5870] max-w-3xl mb-8">
                遇到难题别急着抄答案——<b className="text-[#241f38]">把问题拆回不可再分的基石，从零推起</b>。现场拆讲师做好的第一性原理技能包（公理化思维、还原论解构、隐含假设挖掘……），再对准你手头最难的那个决策调教它，调好上矩阵，天天替你拆。
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="p-5 rounded-xl bg-dark-card-hover/50 border border-dark-border">
                  <div className="text-xs text-violet-600 font-semibold mb-2">拆 · 讲师的第一性原理技能包</div>
                  <div className="text-sm font-bold text-[#241f38]">10 套思维框架全打开</div>
                  <p className="text-xs text-[#9990a8] mt-2">公理化思维、还原论解构、逻辑三洽、隐含假设挖掘、反共识决策——怎么从理论长成 SKILL.md，当堂拆给你看。</p>
                </div>
                <div className="p-5 rounded-xl bg-dark-card-hover/50 border border-dark-border">
                  <div className="text-xs text-violet-600 font-semibold mb-2">调 · 对准你最难的那个决策</div>
                  <div className="text-sm font-bold text-[#241f38]">用它拆你自己的难题</div>
                  <p className="text-xs text-[#9990a8] mt-2">定价、转型、要不要 All in——现场用它拆一遍：挖出你的隐含假设，检验逻辑三洽，看哪些「常识」其实经不起推敲。</p>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border border-violet-500/30">
                  <div className="text-xs text-violet-600 font-semibold mb-2">用 · 上矩阵跑</div>
                  <div className="text-sm font-bold text-[#241f38]">你的拆解专家，天天替你拆</div>
                  <p className="text-xs text-[#9990a8] mt-2">调教好的专家接上工作流上矩阵——新决策先过一遍隐含假设检验，定期用它重审你在跑的业务假设，过期假设自动喊你。</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-xs font-semibold text-[#9990a8] tracking-widest mb-3">带走三样</div>
                  <ul className="space-y-2 text-sm text-[#4a4458]">
                    <li className="flex gap-2"><span className="text-violet-600 font-bold">①</span>拆懂「理论 → 技能」的蒸馏法：公理化 / 还原论 / 逻辑三洽怎么变成 AI 会执行的步骤</li>
                    <li className="flex gap-2"><span className="text-violet-600 font-bold">②</span>一个按你的决策场景调教过的第一性原理专家，发到你自己的 GitHub 仓（现场发出去）</li>
                    <li className="flex gap-2"><span className="text-violet-600 font-bold">③</span>一条上了矩阵的假设检验工作流：新决策先拆、旧假设定期重审，卡了会喊你</li>
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#9990a8] tracking-widest mb-3">适合谁</div>
                  <ul className="space-y-2 text-sm text-[#4a4458]">
                    <li>正卡在一个大决策上、不想再抄别人答案的人</li>
                    <li>想给团队装一套「先拆假设再拍板」机制的操盘手</li>
                    <li>上过毛选期、想再吃透一个理论 AI 化的老学员</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => { try { navigator.clipboard?.writeText('happyannie626') } catch (e) {} }}
                  className="px-5 py-2.5 rounded-xl bg-[#6c60cc] text-white text-sm font-semibold hover:bg-[#7d72d6] transition-all"
                  title="点击复制微信号"
                >
                  定档早知道 · 微信 happyannie626 📋
                </button>
                <span className="text-xs text-[#9990a8]">时间地点定档后，报名帖发拆书帮公众号 · 12 人小班</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Workshop Section 3: Chan Theory */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 md:p-10 border border-dark-border relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 text-orange-600 text-sm">
                排期中 · 第三期预告
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-[#241f38] mb-3">拆专家工作坊 · 第三期拆《缠论》</h2>
              <p className="text-[#5f5870] max-w-3xl mb-8">
                缠论最难的不是理论，是<b className="text-[#241f38]">每天雷打不动的看盘纪律</b>——这件事恰好 AI 最擅长。现场拆讲师做好的缠论技能包（走势结构、中枢、买卖点、背驰、多级别联立），对准你自己盯的标的调教它，上矩阵每日自动复盘。
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="p-5 rounded-xl bg-dark-card-hover/50 border border-dark-border">
                  <div className="text-xs text-orange-600 font-semibold mb-2">拆 · 讲师的缠论技能包</div>
                  <div className="text-sm font-bold text-[#241f38]">5 套技术体系全打开</div>
                  <p className="text-xs text-[#9990a8] mt-2">笔段划分、中枢定位、三类买卖点、背驰诊断、多级别联立——怎么把「走势终完美」变成 AI 可执行的判定步骤，当堂拆给你看。</p>
                </div>
                <div className="p-5 rounded-xl bg-dark-card-hover/50 border border-dark-border">
                  <div className="text-xs text-orange-600 font-semibold mb-2">调 · 对准你盯的标的</div>
                  <div className="text-sm font-bold text-[#241f38]">教它你的级别与纪律</div>
                  <p className="text-xs text-[#9990a8] mt-2">你做日线还是 30 分钟级别？守哪类买卖点？止损纪律是什么？把你的操作级别和纪律写进技能——它按你的体系复盘，不给你通用答案。</p>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/30">
                  <div className="text-xs text-orange-600 font-semibold mb-2">用 · 上矩阵跑</div>
                  <div className="text-sm font-bold text-[#241f38]">收盘后，它先替你看一遍</div>
                  <p className="text-xs text-[#9990a8] mt-2">上矩阵定时跑：每日收盘自动出复盘简报——走势分解、中枢位置、背驰提示一条不少；你只看结论和图，不被盘中情绪带跑。</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-xs font-semibold text-[#9990a8] tracking-widest mb-3">带走三样</div>
                  <ul className="space-y-2 text-sm text-[#4a4458]">
                    <li className="flex gap-2"><span className="text-orange-600 font-bold">①</span>拆懂「技术体系 → 技能」的蒸馏法：走势结构与买卖点判定怎么变成 AI 的可执行步骤</li>
                    <li className="flex gap-2"><span className="text-orange-600 font-bold">②</span>一个按你的级别与纪律调教过的缠论专家，发到你自己的 GitHub 仓（现场发出去）</li>
                    <li className="flex gap-2"><span className="text-orange-600 font-bold">③</span>一条上了矩阵的每日复盘工作流：收盘自动出简报，背驰/买卖点变动会喊你</li>
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#9990a8] tracking-widest mb-3">适合谁</div>
                  <ul className="space-y-2 text-sm text-[#4a4458]">
                    <li>学过缠论、但总败在「没时间每天画笔标中枢」的人</li>
                    <li>想让复盘从意志力变成自动流水线的交易者</li>
                    <li>上过前两期、想再吃透一个体系 AI 化的老学员</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => { try { navigator.clipboard?.writeText('happyannie626') } catch (e) {} }}
                  className="px-5 py-2.5 rounded-xl bg-[#6c60cc] text-white text-sm font-semibold hover:bg-[#7d72d6] transition-all"
                  title="点击复制微信号"
                >
                  定档早知道 · 微信 happyannie626 📋
                </button>
                <span className="text-xs text-[#9990a8]">只做方法拆解与自动复盘，不荐股不预测行情 · 12 人小班</span>
              </div>
            </div>
          </motion.div>
        </section>

        <div className="flex justify-center gap-2 mb-10">
          {[
            { k: 'sources', l: '专家' },
            { k: 'fusion', l: '专家团' },
          ].map(t => (
            <button key={t.k}
              onClick={() => setTab(t.k)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                tab === t.k
                  ? 'bg-[#241f38] text-white shadow-sm'
                  : 'bg-black/[.04] text-[#5f5870] hover:text-[#241f38] hover:bg-black/[.06]'
              }`}
            >{t.l}</button>
          ))}
        </div>

        {tab === 'sources' && (
          <div className="grid gap-4">
            {skillSources.map(src => (
              <div key={src.id}
                className={`rounded-xl border bg-gradient-to-br ${catColors[src.category] || 'border-slate-700/50 from-slate-800/50 to-slate-900/50'} overflow-hidden`}
              >
                <button
                  onClick={() => setExpandedId(expandedId === src.id ? null : src.id)}
                  className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`text-xl font-black ${catAccents[src.category] || 'text-[#4a4458]'}`}>
                      {src.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-black/[.06] text-[#5f5870]">
                      {src.category}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-black/[.06] text-[#5f5870]">
                      {src.skills.length} 技能
                    </span>
                  </div>
                  <svg className={`w-5 h-5 text-[#9990a8] shrink-0 transition-transform ${expandedId === src.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedId === src.id && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-[#9990a8] mb-4">{src.description}</p>

                    {/* 下载全部 */}
                    {src.id !== 'book2startup' && (
                      <button onClick={() => dlTar(src.id)}
                        className="mb-4 px-4 py-1.5 rounded-lg bg-black/[.04] hover:bg-black/[.06] text-xs text-[#5f5870] hover:text-[#241f38] transition-all inline-flex items-center gap-1.5"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        下载全部 ({src.id}.tar.gz)
                      </button>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5">
                      {src.skills.map(sk => (
                        <div key={sk.slug}
                          className="group flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] transition-colors"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="text-sm text-[#4a4458] group-hover:text-[#241f38] transition-colors truncate">
                              {sk.name}
                            </div>
                            <div className="text-[11px] text-[#9990a8] truncate">{sk.desc}</div>
                          </div>
                          <button onClick={() => dlSkill(src.id, sk.slug)}
                            className="ml-2 p-1.5 rounded hover:bg-black/[.06] text-[#9990a8] hover:text-neon-purple transition-all opacity-0 group-hover:opacity-100 shrink-0"
                            title="下载">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'fusion' && (
          <div className="grid md:grid-cols-2 gap-5">
            {fusionPacks.map(p => (
              <div key={p.id}
                className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 hover:border-neon-purple/30 transition-all overflow-hidden"
              >
                <button
                  onClick={() => setExpandedPack(expandedPack === p.id ? null : p.id)}
                  className="w-full text-left p-5"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-xl mr-2">{p.emoji}</span>
                      <span className="text-lg font-bold text-[#241f38]">{p.name}</span>
                    </div>
                    <svg className={`w-5 h-5 text-[#9990a8] shrink-0 mt-1 transition-transform ${expandedPack === p.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <p className="text-sm text-[#9990a8]">{p.description}</p>
                </button>

                {expandedPack === p.id && (
                  <div className="px-5 pb-5">
                    <div className="space-y-1.5 mb-4">
                      {p.combinations.map((c, i) => {
                        const src = skillSources.find(s => s.id === c.from)
                        const sk = src?.skills.find(s => s.slug === c.skill)
                        return (
                          <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-white/[0.03]">
                            <span className="text-xs font-bold text-neon-purple mt-0.5 shrink-0">#{i + 1}</span>
                            <div className="min-w-0">
                              <div className="text-sm text-[#241f38] truncate">
                                <span className="font-medium">{sk?.name || c.skill}</span>
                                <span className="text-[#9990a8] mx-1">·</span>
                                <span className="text-[#9990a8]">{src?.name}</span>
                              </div>
                              <div className="text-xs text-[#9990a8] truncate">{c.desc}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <button onClick={() => dlFusion(p.name, p.id)}
                      className="w-full py-2 rounded-lg bg-neon-purple/20 text-neon-purple text-sm font-medium hover:bg-neon-purple/30 transition-colors"
                    >
                      下载融合包 (.md)
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
