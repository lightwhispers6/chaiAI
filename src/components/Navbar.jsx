import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { nextOpen } from '../data/workshops'

const navLinks = [
  { path: '/learning-path', label: '拆成长' },
  { path: '/hot', label: '拆经典' },
  { path: '/chaibuddy', label: '拆搭子' },
  { path: '/workshops', label: '拆软件' },
  { path: '/skills', label: '拆技能' },
  { path: '/skill-fusion', label: '拆专家' },
  { path: '/coai', label: '共拆AI' },
  { path: '/about', label: '关于' },
  { path: '/contact', label: '联系我' },
]

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const nx = nextOpen()
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const isActive = (p) => location.pathname === p || location.pathname === base + p

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || menuOpen ? 'bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-b border-black/[.06]' : 'bg-white/60 backdrop-blur-md'
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={`${import.meta.env.BASE_URL}images/logo-mark.png`}
            alt="拆书成课"
            className="h-9 w-auto"
          />
          <span className="text-[19px] font-bold tracking-tight text-[#241f38]">拆书成课</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => link.external ? (
            <a
              key={link.path}
              href={link.path}
              className="px-3.5 py-1.5 rounded-full text-[13.5px] font-medium transition-all duration-200 text-[#5f5870] hover:text-[#241f38] hover:bg-black/[.04]"
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3.5 py-1.5 rounded-full text-[13.5px] font-medium transition-all duration-200 ${
                isActive(link.path)
                  ? 'bg-black/[.05] text-[#241f38]'
                  : 'text-[#5f5870] hover:text-[#241f38] hover:bg-black/[.04]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {nx && (
            <a
              href={nx.link}
              className="ml-2 px-4 py-1.5 rounded-full text-[13.5px] font-semibold bg-[#6c60cc] text-white hover:bg-[#7d72d6] transition-colors shadow-[0_4px_14px_rgba(108,96,204,.3)]"
            >
              报名工作坊
            </a>
          )}
        </div>

        <div className="flex items-center gap-1.5 md:hidden">
          {nx && <a href={nx.link} className="px-3.5 py-1.5 rounded-full text-[13px] font-semibold bg-[#6c60cc] text-white">报名</a>}
          <button
            type="button"
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
            className="p-2.5 -mr-1.5 rounded-full text-[#241f38] hover:bg-black/[.05] active:bg-black/[.08] transition-colors"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-black/[.06] shadow-[0_12px_32px_rgba(0,0,0,.08)]">
          <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col">
            {navLinks.map(link => link.external ? (
              <a
                key={link.path}
                href={link.path}
                className="py-3 text-[15px] font-medium text-[#5f5870] border-b border-black/[.04] last:border-0 active:text-[#241f38]"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`py-3 text-[15px] border-b border-black/[.04] last:border-0 ${
                  isActive(link.path)
                    ? 'text-[#241f38] font-semibold'
                    : 'text-[#5f5870] font-medium'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
