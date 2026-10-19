import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

type PlayerProps = {
  src: string
  poster: string
  play?: 'inview' | 'hover' | boolean
  className?: string
  videoClassName?: string
  label?: string
  objectPosition?: string
}

export function Player({
  src,
  poster,
  play = 'inview',
  className = '',
  videoClassName = '',
  label,
  objectPosition = 'center',
}: PlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [inView, setInView] = useState(false)
  const [hovered, setHovered] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15, rootMargin: '120px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const shouldPlay = reduced ? false : play === true ? true : play === false ? false : play === 'inview' ? inView : hovered

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (shouldPlay) {
      const attempt = video.play()
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => undefined)
    } else {
      video.pause()
    }
  }, [shouldPlay])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        aria-label={label}
        tabIndex={-1}
        className={`h-full w-full object-cover ${videoClassName}`}
        style={{ objectPosition }}
      />
    </div>
  )
}
