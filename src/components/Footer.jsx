import { Link } from 'react-router-dom'
import { nextOpen } from '../data/workshops'

export default function Footer() {
  const nx = nextOpen()
  return (
    <footer className="border-t border-[#e7e0d2] bg-[#f5f1e8]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div
              className="text-[19px] font-bold text-[#241f38] mb-2"
              style={{ fontFamily: 'var(--font-serif)', letterSpacing: '0.04em' }}
            >
              拆书成课
            </div>
            <p className="text-[13px] leading-relaxed text-[#9990a8] max-w-sm">
              把一本书拆成大纲，把大纲拆成课件，把课件拆成一门能交付、能被验收的课。
            </p>
            <p className="text-[13px] leading-relaxed text-[#9990a8] mt-3 max-w-sm">
              主理人 annie · 微信 <span className="text-[#6c60cc] font-medium">happyannie626</span>
            </p>
          </div>
          <div>
            <div className="text-[12px] font-semibold text-[#241f38] mb-3 tracking-wide">课程</div>
            <ul className="space-y-2 text-[13px] text-[#5f5870]">
              <li><Link to="/workshops" className="hover:text-[#6c60cc] transition-colors">全部课程</Link></li>
              <li><Link to="/learning-path" className="hover:text-[#6c60cc] transition-colors">拆课路径</Link></li>
              <li><a href={nx ? nx.link : '/workshops'} className="hover:text-[#6c60cc] transition-colors">{nx ? '报名下一场' : '课程材料回看'}</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[12px] font-semibold text-[#241f38] mb-3 tracking-wide">资源</div>
            <ul className="space-y-2 text-[13px] text-[#5f5870]">
              <li><Link to="/hot/books" className="hover:text-[#6c60cc] transition-colors">拆经典</Link></li>
              <li><Link to="/skills" className="hover:text-[#6c60cc] transition-colors">拆课技能</Link></li>
              <li><Link to="/about" className="hover:text-[#6c60cc] transition-colors">关于 annie</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-[#e7e0d2] flex flex-col md:flex-row justify-between gap-2 text-[12px] text-[#9990a8]">
          <span>© 2026 拆书成课 · annie · 微信 happyannie626</span>
          <span>内容方法论：拆书帮 RIA 便签法</span>
        </div>
      </div>
    </footer>
  )
}
