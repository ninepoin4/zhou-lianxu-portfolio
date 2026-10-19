import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { DotsMark } from './DotsMark'

export function Loader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (reduced) {
      onDone()
      return
    }
    const duration = 1150
    const start = performance.now()
    let frame = 0
    let timer = 0
    const tick = (now: number) => {
      const value = Math.min(1, (now - start) / duration)
      setProgress(value)
      if (value < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        timer = window.setTimeout(onDone, 200)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [onDone, reduced])

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-paper px-6 py-6 text-ink sm:px-10 sm:py-8"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <DotsMark size={16} />
          <span className="eyebrow text-ink/60">周连旭 / ZHOU LIANXU</span>
        </div>
        <span className="eyebrow text-ink/40">PORTFOLIO 2026</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-7">
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="display text-[22vw] leading-none text-ink sm:text-[16vw]"
          >
            周连旭
          </motion.div>
        </div>
        <div className="h-px w-[42vw] max-w-[320px] overflow-hidden bg-ink/15">
          <motion.div className="h-full bg-amber" style={{ width: `${progress * 100}%` }} />
        </div>
        <p className="eyebrow text-ink/40">AI FILM / WORKFLOW / DEPLOYMENT</p>
      </div>

      <div className="flex items-end justify-between">
        <span className="eyebrow text-ink/40">LOADING REEL</span>
        <span className="font-mono text-[11px] tabular-nums text-ink/60">
          {Math.round(progress * 100)
            .toString()
            .padStart(3, '0')}
        </span>
      </div>
    </motion.div>
  )
}
