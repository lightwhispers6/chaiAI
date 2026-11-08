import { motion } from 'framer-motion'

const WECHAT = 'happyannie626'

function ContactBlock() {
  return (
    <div className="p-7 rounded-xl bg-[#f5f1e8]/70 border border-[#e7e0d2]">
      <div className="flex flex-col sm:flex-row items-center gap-7">
        <img
          src="/images/wechat-qr.png"
          alt="annie 微信二维码"
          className="w-40 h-40 shrink-0 rounded-xl bg-white p-2 border border-[#e7e0d2] shadow-[0_6px_20px_rgba(36,31,56,.07)]"
        />
        <div className="text-center sm:text-left">
          <div className="text-[12px] tracking-[0.18em] text-[#efb324] font-semibold mb-3">
            CONTACT
          </div>
          <div className="text-[12.5px] text-[#5f5870] mb-1.5">扫码加我微信，直接说你的想法</div>
          <div
            className="text-[22px] font-bold text-[#6c60cc]"
            style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.02em' }}
          >
            {WECHAT}
          </div>
          <p className="text-[12.5px] leading-relaxed text-[#9990a8] mt-3 max-w-md">
            备注「拆书成课」，告诉我你手里是哪本书、想讲给谁听。
            我先给你一份拆解思路，不合适也当交个朋友。
          </p>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 md:p-12"
        >
          {/* 品牌与主理人 */}
          <div className="text-center mb-12">
            <img
              src="/images/logo-chaishu.png"
              alt="拆书成课"
              className="w-32 md:w-40 mx-auto mb-2"
            />
            <div className="w-16 h-px bg-[#efb324]/50 mx-auto mb-5" />
            <p className="text-[15px] text-[#5f5870]">
              <span className="font-semibold text-[#6c60cc]">annie</span>
              <span className="mx-2 text-[#c9b9a4]">·</span>
              内容策划师 / 课程设计
            </p>
          </div>

          {/* 信息卡 */}
          <div className="grid sm:grid-cols-2 gap-3 mb-12">
            {[
              { label: '主理人', value: 'annie' },
              { label: '所在地', value: '佛山 · 禅城' },
              { label: '微信', value: WECHAT },
              { label: '在做的', value: '把书拆成课、把业务拆成课程' },
            ].map(info => (
              <div key={info.label} className="p-4 rounded-xl bg-white/60 border border-[#e7e0d2]">
                <div className="text-[11px] tracking-wide text-[#9990a8] mb-1">{info.label}</div>
                <div className="text-[13.5px] text-[#241f38]">{info.value}</div>
              </div>
            ))}
          </div>

          {/* 关于我 */}
          <div className="mb-12">
            <h2
              className="text-[20px] font-bold text-[#241f38] mb-5"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              关于我
            </h2>
            <div className="space-y-4 text-[14px] leading-[1.9] text-[#5f5870]">
              <p>
                我做内容策划出身。这些年一直在干同一件事：
                <span className="text-[#241f38] font-medium">把杂乱的信息，整理成别人能听懂、能上手、愿意付钱的东西。</span>
              </p>
              <p>
                早年在电商做详情页和文创产品文案——一个保温杯要卖出去，
                靠的不是堆参数，是讲清楚它为什么值得被送人。
                后来发现，做课和做详情页是同一件事：
                <span className="text-[#241f38] font-medium">都是把价值拆到对方能感知的颗粒度。</span>
              </p>
              <p>
                于是我把这套方法用到了课程上。一本书到手，先找骨架、砍枝叶，
                再排成一条走得通的学习路径，最后做成一套拿起来就能开讲的资产。
                这些年也把这套东西用在企业内部培训上——从调研问卷、课件到验收，
                一条线交付到底。
              </p>
              <p>
                我不太相信"听完就会了"。知识不落到<span className="text-[#6c60cc] font-medium">能讲出来</span>，
                就不算真的学会。所以这里的一切，最后都要落到"你能不能开讲"。
              </p>
            </div>
          </div>

          {/* 我在做什么 */}
          <div className="mb-12">
            <h2
              className="text-[20px] font-bold text-[#241f38] mb-5"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              我在做什么
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { name: '拆书成课', desc: '一本书 → 大纲 → 课件 → 练习 → 验收标准，一套走完' },
                { name: '课程设计', desc: '把一门业务、一套经验，排成有节奏的学习路径' },
                { name: '内容策划', desc: '详情页、产品文案、品牌内容，讲清楚为什么值得' },
                { name: 'AI 提效', desc: '把重复的内容生产交给工具，人只做判断和取舍' },
              ].map(s => (
                <div key={s.name} className="p-5 rounded-xl bg-white/60 border border-[#e7e0d2]">
                  <div
                    className="text-[15px] font-bold text-[#241f38] mb-2"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {s.name}
                  </div>
                  <div className="text-[12.5px] leading-relaxed text-[#5f5870]">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 联系 */}
          <div className="mb-4">
            <h2
              className="text-[20px] font-bold text-[#241f38] mb-5"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              联系我
            </h2>
            <ContactBlock />
          </div>

          {/* 页脚说明 */}
          <p className="text-[11.5px] leading-relaxed text-[#9990a8] mt-8 pt-6 border-t border-[#e7e0d2]">
            本站部分内容整理自公开的拆书资料，著作权归原作者所有，仅作学习交流。
            如涉版权问题请联系 annie（微信 {WECHAT}），核实后即刻处理。
          </p>
        </motion.div>
      </div>
    </div>
  )
}
