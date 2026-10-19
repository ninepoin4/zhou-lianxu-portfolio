import type { ReactNode } from 'react'

type MarqueeProps = {
  children: ReactNode
  speed?: number
  reverse?: boolean
  className?: string
  trackClassName?: string
  pauseOnHover?: boolean
}

export function Marquee({
  children,
  speed = 34,
  reverse = false,
  className = '',
  trackClassName = '',
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={`group relative w-full overflow-hidden ${pauseOnHover ? 'hover:[&_.marquee-track]:[animation-play-state:paused]' : ''} ${className}`}
    >
      <div
        className={`marquee-track flex w-max will-change-transform ${reverse ? '[animation-direction:reverse]' : ''} ${trackClassName}`}
        style={{ ['--marquee-duration' as string]: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
