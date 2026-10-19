import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, Volume2, X } from 'lucide-react'
import { setScrollLocked } from '../lib/scroll'
import type { LightboxItem } from './Works'

type Props = {
  items: LightboxItem[]
  startIndex: number
  onClose: () => void
}

export function Lightbox({ items, startIndex, onClose }: Props) {
  const [index, setIndex] = useState(startIndex)
  const [mounted, setMounted] = useState(false)
  const reduced = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
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
    const timer = window.setTimeout(() => setMounted(true), 20)
    return () => {
      window.clearTimeout(timer)
      setScrollLocked(false)
      previousFocus.current?.focus?.()
    }
  }, [])

  const next = useCallback(() => setIndex((value) => (value + 1) % items.length), [items.length])
  const prev = useCallback(() => setIndex((value) => (value - 1 + items.length) % items.length), [items.length])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeRef.current()
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
    if (!video) return
    video.currentTime = 0
    const attempt = video.play()
    if (attempt && typeof attempt.catch === 'function') attempt.catch(() => undefined)
  }, [index])

  if (!item) return null

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} 播放`}
      className="fixed inset-0 z-[150] flex flex-col bg-ink/95 backdrop-blur-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="flex items-center justify-between border-b border-cream/10 px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/35">
            {item.index ? `FRAME ${item.index}` : 'SHOWREEL'}
          </span>
          <span className="h-3 w-px bg-cream/15" />
          <span className="max-w-[40vw] truncate text-[12px] text-cream/70">{item.title}</span>
        </div>
        <div className="flex items-center gap-2">
          {items.length > 1 && (
            <div className="mr-2 hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={prev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/60 transition-colors hover:border-amber hover:text-amber"
                aria-label="上一个"
              >
                <ArrowLeft size={14} strokeWidth={1.4} />
              </button>
              <button
                type="button"
                onClick={next}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/60 transition-colors hover:border-amber hover:text-amber"
                aria-label="下一个"
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
            aria-label="关闭"
          >
            <X size={18} strokeWidth={1.3} />
          </button>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-[1fr_360px] lg:overflow-hidden">
        <div
          className="relative flex min-h-[32vh] items-center justify-center bg-black/40 p-4 sm:p-8 lg:min-h-0"
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              className="relative flex h-full max-h-[46vh] w-full items-center justify-center lg:max-h-[78vh]"
              initial={reduced ? undefined : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <video
                ref={videoRef}
                key={item.src}
                src={item.src}
                poster={item.poster}
                controls
                autoPlay={!reduced}
                muted
                loop
                playsInline
                preload="metadata"
                className={`h-full w-auto max-w-full bg-black object-contain shadow-2xl ${item.ratio === '9:16' ? 'max-h-full' : 'max-h-full'}`}
              />
            </motion.div>
          </AnimatePresence>
          {!mounted && <div className="absolute inset-0 bg-ink" />}
          <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-cream/60 backdrop-blur-sm sm:bottom-6 sm:left-6">
            <Volume2 size={10} strokeWidth={1.4} />
            默认静音 · 预览为节选 · 右下角开启声音
          </div>
        </div>

        <div className="flex flex-col justify-between border-t border-cream/10 px-5 py-6 sm:px-8 lg:overflow-y-auto lg:border-l lg:border-t-0 lg:py-8">
          <div>
            <span className="eyebrow text-amber">{item.en ?? 'SELECTED WORK'}</span>
            <h3 className="display mt-4 text-[clamp(1.8rem,3.1vw,2.65rem)] leading-[1.08] text-cream">{item.title}</h3>
            {item.client && <p className="mt-2 text-[13px] text-cream/50">{item.client}</p>}
            {item.desc && (
              <p className="mt-6 text-[13px] leading-[1.9] text-cream/65">{item.desc}</p>
            )}

            <dl className="mt-8 grid grid-cols-3 gap-3 border-y border-cream/12 py-4">
              <div>
                <dt className="font-mono text-[8px] uppercase tracking-[0.18em] text-cream/30">YEAR</dt>
                <dd className="mt-1.5 font-mono text-[11px] text-cream/75">{item.year ?? '2026'}</dd>
              </div>
              <div>
                <dt className="font-mono text-[8px] uppercase tracking-[0.18em] text-cream/30">LENGTH</dt>
                <dd className="mt-1.5 font-mono text-[11px] text-cream/75">{item.duration ?? '—'}</dd>
              </div>
              <div>
                <dt className="font-mono text-[8px] uppercase tracking-[0.18em] text-cream/30">RATIO</dt>
                <dd className="mt-1.5 font-mono text-[11px] text-cream/75">{item.ratio}</dd>
              </div>
            </dl>

            {item.role && item.role.length > 0 && (
              <div className="mt-6">
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-cream/30">ROLE</p>
                <p className="mt-2 text-[12px] leading-relaxed text-cream/60">{item.role.join(' · ')}</p>
              </div>
            )}

            {item.tools && item.tools.length > 0 && (
              <div className="mt-5">
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-cream/30">TOOLS</p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {item.tools.map((tool) => (
                    <span
                      key={tool}
                      className="border border-cream/15 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-cream/55"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {items.length > 1 && (
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={prev}
                className="group flex flex-1 items-center justify-between border border-cream/15 px-3 py-3 text-left transition-colors hover:border-cream/40"
              >
                <span className="flex items-center gap-2 text-[10px] text-cream/50">
                  <ArrowLeft size={12} strokeWidth={1.4} />
                  上一部
                </span>
                <span className="max-w-[7rem] truncate font-mono text-[8px] uppercase tracking-[0.1em] text-cream/35">
                  {items[(index - 1 + items.length) % items.length].title}
                </span>
              </button>
              <button
                type="button"
                onClick={next}
                className="group flex flex-1 items-center justify-between border border-cream/15 px-3 py-3 text-left transition-colors hover:border-cream/40"
              >
                <span className="flex items-center gap-2 text-[10px] text-cream/50">
                  下一部
                  <ArrowRight size={12} strokeWidth={1.4} />
                </span>
                <span className="max-w-[7rem] truncate font-mono text-[8px] uppercase tracking-[0.1em] text-cream/35">
                  {items[(index + 1) % items.length].title}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
