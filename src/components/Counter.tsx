import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

type CounterProps = {
  value: number
  suffix?: string
  duration?: number
  className?: string
  suffixClassName?: string
}

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

export function Counter({ value, suffix = '', duration = 1.8, className = '', suffixClassName = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(0)
  const decimals = Number.isInteger(value) ? 0 : 2

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setDisplay(value)
      return
    }
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / (duration * 1000))
      const next = easeOutExpo(progress) * value
      setDisplay(decimals ? Number(next.toFixed(decimals)) : Math.round(next))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration, reduced])

  return (
    <span ref={ref} className={className}>
      {decimals ? display.toFixed(decimals) : display.toLocaleString('en-US')}
      <span className={suffixClassName}>{suffix}</span>
    </span>
  )
}
