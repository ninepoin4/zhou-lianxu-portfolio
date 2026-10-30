import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2, Pause, Play, Volume2, VolumeX, X } from 'lucide-react'
import { setScrollLocked } from '../lib/scroll'
import type { LightboxItem } from './Works'

type Props = {
  items: LightboxItem[]
  startIndex: number
  onClose: () => void
}

export function Lightbox({ items, startIndex, onClose }: Props) {
  const [index, setIndex] = useState(startIndex)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const reduced = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const item = items[index]
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement | null
    window.setTimeout(() => closeButtonRef.current?.focus(), 60)
    setScrollLocked(true)
    return () => {
      setScrollLocked(false)
      previousFocus.current?.focus?.()
    }
  }, [])

  const next = useCallback(() => setIndex((value) => (value + 1) % items.length), [items.length])
  const prev = useCallback(() => setIndex((value) => (value - 1 + items.length) % items.length), [items.length])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeRef.current()
      const target = event.target as HTMLElement | null
      const editing = target?.closest('input, textarea, select')
      if (editing) return
      if (event.key === 'ArrowRight') next()
      if (event.key === 'ArrowLeft') prev()
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), video[controls], input, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  useEffect(() => {
    const video = videoRef.current
    setPlaying(false)
    setMuted(true)
    setProgress(0)
    setDuration(0)
    if (!video) return
    video.currentTime = 0
    if (!reduced) {
      const attempt = video.play()
      if (attempt && typeof attempt.then === 'function') {
        attempt.then(() => setPlaying(true)).catch(() => setPlaying(false))
      }
    }
  }, [index, reduced])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      const attempt = video.play()
      if (attempt && typeof attempt.then === 'function') attempt.catch(() => undefined)
    } else {
      video.pause()
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  const seek = (value: number) => {
    const video = videoRef.current
    if (!video || !Number.isFinite(duration) || duration <= 0) return
    const next = (value / 1000) * duration
    video.currentTime = next
    setProgress(next)
  }

  const formatTime = (value: number) => {
    if (!Number.isFinite(value) || value < 0) return '0:00'
    const minutes = Math.floor(value / 60)
    const seconds = Math.floor(value % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  const toggleFullscreen = () => {
    const element = mediaRef.current
    if (!element) return
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    } else {
      void element.requestFullscreen?.()
    }
  }

  if (!item) return null

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} 案例`}
      className="fixed inset-0 z-[150] flex flex-col bg-[#0b0b09]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="relative z-10 flex items-center justify-between border-b border-cream/10 px-5 py-4 sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-amber">
            {item.index === '00' ? 'SHOWREEL' : item.sample ? '示例成片' : `${item.index} / 05`}
          </span>
          <span className="hidden h-3 w-px shrink-0 bg-cream/15 sm:block" />
          <span className="truncate text-[12px] text-cream/65">{item.title}</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {items.length > 1 && (
            <div className="mr-2 hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={prev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/60 transition-colors hover:border-amber hover:text-amber"
                aria-label="上一个案例"
              >
                <ArrowLeft size={14} strokeWidth={1.4} />
              </button>
              <button
                type="button"
                onClick={next}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/60 transition-colors hover:border-amber hover:text-amber"
                aria-label="下一个案例"
              >
                <ArrowRight size={14} strokeWidth={1.4} />
              </button>
              <span className="ml-2 font-mono text-[9px] tabular-nums text-cream/35">
                {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
            </div>
          )}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:border-amber hover:text-amber"
            aria-label="关闭案例"
          >
            <X size={18} strokeWidth={1.3} />
          </button>
        </div>
        <motion.span
          className="absolute bottom-0 left-0 h-px bg-amber/70"
          initial={false}
          animate={{ width: `${((index + 1) / items.length) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-[1fr_420px] lg:overflow-hidden">
        <div
          className="relative flex min-h-[44vh] items-center justify-center overflow-hidden bg-[#0e0e0b] p-4 sm:p-8 lg:min-h-0"
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <span
            className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 font-serif text-[16rem] leading-none text-cream/[0.035] sm:text-[22rem]"
            aria-hidden="true"
          >
            {item.index}
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={item.src}
              className="relative flex h-full max-h-[62vh] w-full flex-col items-center justify-center lg:max-h-[80vh]"
              initial={reduced ? undefined : { opacity: 0, scale: 0.988 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.992 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {item.mediaType === 'video' ? (
                <div ref={mediaRef} className="flex h-full w-full flex-col items-center justify-center">
                  <div className="relative flex w-full flex-none items-center justify-center">
                    <video
                      ref={videoRef}
                      key={item.src}
                      src={item.src}
                      poster={item.poster}
                      autoPlay={!reduced}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onClick={togglePlay}
                      onPlay={() => setPlaying(true)}
                      onPause={() => setPlaying(false)}
                      onTimeUpdate={(event) => setProgress(event.currentTarget.currentTime)}
                      onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
                      onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
                      className="max-h-[calc(62vh-64px)] max-w-full cursor-pointer bg-black object-contain shadow-2xl lg:max-h-[calc(80vh-64px)]"
                    />
                    {!playing && (
                      <button
                        type="button"
                        onClick={togglePlay}
                        aria-label="播放视频"
                        className="absolute inset-0 flex items-center justify-center bg-ink/15 transition-colors hover:bg-ink/25"
                      >
                        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-cream/20 bg-paper/90 text-ink shadow-[0_18px_45px_-20px_rgba(0,0,0,0.8)]">
                          <Play size={20} strokeWidth={1.2} fill="currentColor" className="ml-1" />
                        </span>
                      </button>
                    )}
                  </div>

                  <div className="mt-3 flex w-full max-w-[760px] items-center gap-3 border-t border-cream/12 pt-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={playing ? '暂停视频' : '播放视频'}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cream/15 text-cream/65 transition-colors hover:border-amber hover:text-amber"
                    >
                      {playing ? <Pause size={13} strokeWidth={1.4} /> : <Play size={13} strokeWidth={1.4} className="ml-0.5" />}
                    </button>
                    <span className="w-[70px] shrink-0 font-mono text-[9px] tabular-nums tracking-[0.04em] text-cream/40">
                      {formatTime(progress)} / {formatTime(duration)}
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={1000}
                      value={duration > 0 ? Math.round((progress / duration) * 1000) : 0}
                      onChange={(event) => seek(Number(event.currentTarget.value))}
                      aria-label="视频进度"
                      className="h-1 min-w-0 flex-1 cursor-pointer appearance-none rounded-full bg-cream/20 accent-[#c8763c]"
                    />
                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={muted ? '打开声音' : '静音'}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cream/15 text-cream/65 transition-colors hover:border-amber hover:text-amber"
                    >
                      {muted ? <VolumeX size={13} strokeWidth={1.4} /> : <Volume2 size={13} strokeWidth={1.4} />}
                    </button>
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      aria-label="全屏"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cream/15 text-cream/65 transition-colors hover:border-amber hover:text-amber"
                    >
                      <Maximize2 size={12} strokeWidth={1.4} />
                    </button>
                  </div>

                </div>
              ) : (
                <img
                  src={item.src}
                  alt={`${item.title} 案例全图`}
                  className="max-h-full max-w-full object-contain shadow-2xl"
                />
              )}
            </motion.div>
          </AnimatePresence>

        </div>

        <div className="border-t border-cream/10 px-5 py-6 sm:px-8 lg:overflow-y-auto lg:border-l lg:border-t-0 lg:py-8">
          <h3 className="display text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.04] text-cream">
            {item.title}
            <span className="text-amber">.</span>
          </h3>
          <p className="mt-2 text-[12.5px] text-cream/45">{item.client}</p>

          <div className="mt-6 grid grid-cols-3 gap-3 border-y border-cream/12 py-4">
            {item.metrics.map((metric) => (
              <div key={metric.label}>
                <p className="display whitespace-nowrap text-[clamp(1.05rem,1.8vw,1.45rem)] leading-none text-cream">
                  {metric.value}
                </p>
                <p className="mt-2 text-[10px] leading-[1.5] tracking-[0.06em] text-cream/40">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[12.5px] leading-[1.95] text-cream/65">{item.details}</p>

          {item.links?.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {item.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 border border-cream/20 px-3 py-2 text-[10.5px] text-cream/70 transition-colors hover:border-amber hover:text-amber"
                >
                  {link.label}
                  <ArrowUpRight
                    size={11}
                    strokeWidth={1.4}
                    className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ))}
            </div>
          ) : null}

          <div className="mt-7">
            <p className="text-[10px] tracking-[0.08em] text-cream/35">交付</p>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {item.deliverables.map((deliverable, deliverableIndex) => (
                <li key={deliverable} className="flex items-start gap-2.5 text-[11.5px] leading-[1.5] text-cream/60">
                  <span className="pt-px font-mono text-[8px] text-amber/80">
                    {String(deliverableIndex + 1).padStart(2, '0')}
                  </span>
                  {deliverable}
                </li>
              ))}
            </ul>
          </div>

          {item.detailImage && (
            <figure className="mt-7 border border-cream/12">
              <img src={item.detailImage} alt={`${item.title} 细节`} className="w-full" loading="lazy" />
              {item.detailCaption && (
                <figcaption className="border-t border-cream/10 px-3 py-2 font-mono text-[8px] leading-[1.6] tracking-[0.08em] text-cream/35">
                  {item.detailCaption}
                </figcaption>
              )}
            </figure>
          )}

          <div className="mt-7 grid grid-cols-2 gap-4 border-t border-cream/12 pt-4">
            <div>
              <p className="text-[10px] tracking-[0.08em] text-cream/35">角色</p>
              <p className="mt-2 text-[11.5px] leading-[1.7] text-cream/60">{item.role.join(' · ')}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.08em] text-cream/35">工具</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {item.tools.map((tool) => (
                  <span
                    key={tool}
                    className="border border-cream/15 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-cream/50"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  )
}
