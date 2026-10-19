import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

type CursorState = 'idle' | 'link' | 'label'

export function Cursor() {
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState<CursorState>('idle')
  const [label, setLabel] = useState('')
  const [pressed, setPressed] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const dotX = useSpring(x, { stiffness: 1200, damping: 60, mass: 0.25 })
  const dotY = useSpring(y, { stiffness: 1200, damping: 60, mass: 0.25 })
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 })

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')

    const move = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    const over = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      if (!target) return
      const labelled = target.closest<HTMLElement>('[data-cursor]')
      if (labelled) {
        setState('label')
        setLabel(labelled.dataset.cursorLabel ?? '')
        return
      }
      if (target.closest('a, button, [role="button"], input, textarea, summary')) {
        setState('link')
        setLabel('')
        return
      }
      setState('idle')
      setLabel('')
    }
    const down = () => setPressed(true)
    const up = () => setPressed(false)
    const leave = () => {
      x.set(-100)
      y.set(-100)
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    window.addEventListener('pointerdown', down, { passive: true })
    window.addEventListener('pointerup', up, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)

    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [reduced, x, y])

  if (!enabled) return null

  const ringSize = state === 'label' ? (label ? 82 : 64) : state === 'link' ? 46 : 30

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[300] hidden overflow-hidden md:block">
      <motion.div className="absolute left-0 top-0" style={{ x: dotX, y: dotY }}>
        <div
          className="h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream mix-blend-difference"
          style={{ opacity: state === 'label' ? 0 : 1, transition: 'opacity .2s' }}
        />
      </motion.div>
      <motion.div className="absolute left-0 top-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="flex items-center justify-center rounded-full"
          animate={{
            width: ringSize * (pressed ? 0.86 : 1),
            height: ringSize * (pressed ? 0.86 : 1),
            backgroundColor: state === 'label' ? 'rgba(200,118,60,0.96)' : 'rgba(239,238,233,0)',
            borderColor: state === 'label' ? 'rgba(200,118,60,0)' : 'rgba(239,238,233,0.45)',
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.5 }}
          style={{
            translateX: '-50%',
            translateY: '-50%',
            borderWidth: 1,
            borderStyle: 'solid',
            mixBlendMode: state === 'label' ? 'normal' : 'difference',
          }}
        >
          <span
            className="whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink"
            style={{ opacity: state === 'label' && label ? 1 : 0 }}
          >
            {label}
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
