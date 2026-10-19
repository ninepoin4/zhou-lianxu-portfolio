import { useEffect, useState } from 'react'

export function CircularBadge({ text, className = '' }: { text: string; className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="h-full w-full animate-[spin_26s_linear_infinite] text-cream/55">
        <defs>
          <path id="badge-circle" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
        </defs>
        <text className="fill-current font-mono text-[8.5px] uppercase" style={{ letterSpacing: '0.34em' }}>
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber" />
    </div>
  )
}

function pad(value: number) {
  return value.toString().padStart(2, '0')
}

export function Timecode({ fps = 25, startedAt = 0, className = '' }: { fps?: number; startedAt?: number; className?: string }) {
  const [ms, setMs] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const id = window.setInterval(() => setMs(performance.now() - start), 90)
    return () => window.clearInterval(id)
  }, [])

  const totalSeconds = ms / 1000 + startedAt
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.floor(totalSeconds % 60)
  const frames = Math.floor((totalSeconds % 1) * fps)

  return (
    <span className={`font-mono tabular-nums ${className}`}>
      {pad(hours)}:{pad(minutes)}:{pad(seconds)}:{pad(frames)}
    </span>
  )
}
