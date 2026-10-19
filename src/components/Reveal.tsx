import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
  amount?: number
}

export function Reveal({ children, className, delay = 0, y = 26, once = true, amount = 0.2 }: RevealProps) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? undefined : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount, margin: '-8% 0px -8% 0px' }}
      transition={{ duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

type MaskLinesProps = {
  lines: ReactNode[]
  className?: string
  lineClassName?: string
  ready?: boolean
  delay?: number
  stagger?: number
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export function MaskLines({ lines, className = '', lineClassName = '', ready, delay = 0, stagger = 0.085 }: MaskLinesProps) {
  const reduced = useReducedMotion()

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }

  const lineVariant = {
    hidden: { y: '112%', rotate: 1.4, opacity: 0 },
    show: { y: '0%', rotate: 0, opacity: 1, transition: { duration: 1.05, ease } },
  }

  if (reduced) {
    return (
      <div className={className}>
        {lines.map((line, index) => (
          <span key={index} className={`block ${lineClassName}`}>
            {line}
          </span>
        ))}
      </div>
    )
  }

  const trigger =
    ready === undefined
      ? { whileInView: 'show' as const, viewport: { once: true, amount: 0.22 } }
      : { animate: ready ? ('show' as const) : ('hidden' as const) }

  return (
    <motion.div className={className} initial="hidden" variants={container} {...trigger}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden pb-[0.08em]">
          <motion.span className={`block ${lineClassName}`} variants={lineVariant}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.div>
  )
}
