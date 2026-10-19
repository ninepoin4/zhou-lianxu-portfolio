import { motion, useScroll, useSpring } from 'motion/react'
import { scrollToId } from '../lib/scroll'
import { useActiveSection } from '../lib/useActiveSection'

const sections = [
  { id: 'top', index: '00', label: '序' },
  { id: 'works', index: '01', label: '片目' },
  { id: 'pipeline', index: '02', label: '生产线' },
  { id: 'systems', index: '03', label: '系统' },
  { id: 'about', index: '04', label: '关于' },
  { id: 'contact', index: '05', label: '联系' },
]

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-amber"
      style={{ scaleX }}
    />
  )
}

const sectionIds = sections.map((section) => section.id)

export function SectionRail() {
  const active = useActiveSection(sectionIds)

  return (
    <nav
      aria-label="章节导航"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-start gap-4 2xl:flex"
    >
      {sections.map((section) => {
        const isActive = active === section.id
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollToId(section.id)}
            className="group flex items-center gap-3 text-left"
            aria-current={isActive ? 'true' : undefined}
            aria-label={`跳到${section.label}`}
          >
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span
                className={`absolute inset-0 rounded-full border transition-all duration-500 ${
                  isActive ? 'scale-100 border-amber' : 'scale-50 border-ink/25 group-hover:border-ink/55'
                }`}
              />
              <span
                className={`h-[3px] w-[3px] rounded-full transition-all duration-500 ${
                  isActive ? 'bg-amber' : 'bg-ink/35'
                }`}
              />
            </span>
            <span
              className={`overflow-hidden font-mono text-[9px] uppercase tracking-[0.22em] transition-all duration-500 ${
                isActive ? 'max-w-[90px] text-ink/60 opacity-100' : 'max-w-0 text-ink/40 opacity-0 group-hover:max-w-[90px] group-hover:opacity-100'
              }`}
            >
              {section.index} · {section.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
