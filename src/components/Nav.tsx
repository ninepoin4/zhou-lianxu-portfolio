import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'
import { DotsMark } from './DotsMark'
import { useClock } from '../lib/useClock'
import { scrollToId, setScrollLocked } from '../lib/scroll'
import { contact, socials } from '../data/content'
import { useActiveSection } from '../lib/useActiveSection'

const links = [
  { id: 'works', label: '片目', en: 'FILMS', index: '01' },
  { id: 'pipeline', label: '生产线', en: 'PIPELINE', index: '02' },
  { id: 'systems', label: '系统', en: 'SYSTEMS', index: '03' },
  { id: 'about', label: '关于', en: 'ABOUT', index: '04' },
]

const sectionIds = links.map((link) => link.id)

export function Nav({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const clock = useClock()
  const activeSection = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setScrollLocked(open)
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      setScrollLocked(false)
    }
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    window.setTimeout(() => scrollToId(id), 60)
  }

  return (
    <>
      <motion.header
        initial={reduced ? undefined : { y: -70, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : { y: -70, opacity: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled ? 'border-b border-ink/10 bg-paper/80 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className={`container-x flex items-center justify-between transition-all duration-500 ${scrolled ? 'py-3' : 'py-4 sm:py-6'}`}>
          <button
            type="button"
            onClick={() => go('top')}
            className="group flex items-center gap-3 text-left"
            aria-label="回到顶部"
          >
            <DotsMark size={scrolled ? 15 : 18} />
            <span className="flex flex-col leading-none">
              <span className="display text-[17px] tracking-tight text-ink sm:text-lg">周连旭</span>
              <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.3em] text-ink/45">ZHOU LIANXU</span>
            </span>
          </button>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="主导航">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => go(link.id)}
                className="group relative flex items-baseline gap-2"
              >
                <span
                  className={`font-mono text-[9px] transition-opacity duration-300 ${
                    activeSection === link.id ? 'text-amber' : 'text-amber/55'
                  }`}
                >
                  {link.index}
                </span>
                <span
                  className={`relative text-[13px] tracking-[0.06em] transition-colors duration-300 ${
                    activeSection === link.id ? 'text-ink' : 'text-ink/65 group-hover:text-ink'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-amber transition-all duration-500 ease-soft group-hover:w-full ${
                      activeSection === link.id ? 'w-full' : 'w-0'
                    }`}
                  />
                </span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.22em] text-ink/40 xl:block">
              HANGZHOU {clock.slice(0, 5)}
            </span>
            <button
              type="button"
              onClick={() => go('contact')}
              className="group hidden items-center gap-2 text-[13px] text-ink/70 transition-colors hover:text-ink sm:flex"
            >
              <span className="relative">
                联系
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-amber transition-transform duration-500 ease-soft group-hover:scale-x-100" />
              </span>
              <ArrowUpRight size={14} strokeWidth={1.4} className="text-amber transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
              aria-label="打开菜单"
              aria-expanded={open}
            >
              <span className="h-px w-6 bg-ink" />
              <span className="h-px w-4 self-end bg-ink/60" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col bg-paper text-ink lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-5 sm:px-8">
              <div className="flex items-center gap-3">
                <DotsMark size={16} />
                <span className="display text-base">周连旭</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20"
                aria-label="关闭菜单"
              >
                <X size={22} strokeWidth={1.2} />
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-center px-6 sm:px-10">
              <p className="eyebrow mb-8 text-amber">SITE INDEX / 目录</p>
              <div className="flex flex-col">
                {links.map((link, index) => (
                  <motion.button
                    key={link.id}
                    type="button"
                    onClick={() => go(link.id)}
                    className="group flex items-baseline justify-between border-t border-ink/12 py-4 text-left"
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.18 + index * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="display text-[13vw] leading-none text-ink">{link.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">{link.en}</span>
                  </motion.button>
                ))}
                <div className="border-t border-ink/12" />
              </div>
            </div>

            <motion.div
              className="px-6 pb-8 sm:px-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="flex flex-col gap-2 text-sm text-ink/65">
                <a href={`mailto:${contact.email}`} className="link-line w-fit">
                  {contact.email}
                </a>
                <a href={`tel:${contact.phoneRaw}`} className="link-line w-fit">
                  {contact.phone}
                </a>
                <a
                  href={`${import.meta.env.BASE_URL}resume/zhou-lianxu-resume.pdf`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 flex w-fit items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/40"
                >
                  简历 PDF ↗
                </a>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/12 pt-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-[11px] text-ink/55"
                  >
                    {social.label}
                    <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink/30">{social.stat}</span>
                  </a>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35">
                <span>{contact.city} · 一周内到岗</span>
                <span>{clock}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
