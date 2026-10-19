import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Play } from 'lucide-react'
import { Magnetic } from './Magnetic'

const base = import.meta.env.BASE_URL

export function ReelBand({ onPlayReel }: { onPlayReel: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-9%', '9%'])

  return (
    <section ref={ref} aria-label="作品集短片" className="relative h-[58vh] min-h-[430px] w-full overflow-hidden border-y border-ink/10 bg-paper text-ink">
      <motion.img
        src={`${base}media/clips/showreel.jpg`}
        alt="作品集短片画面"
        loading="lazy"
        style={{ y: reduced ? 0 : imageY }}
        className="absolute inset-0 h-[118%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-paper/95 via-paper/25 to-paper/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-paper/60 via-transparent to-paper/25" />

      <div className="container-x relative flex h-full flex-col justify-between py-8 sm:py-10">
        <div className="flex items-center justify-between">
          <span className="eyebrow flex items-center gap-2 text-amber">
            <span className="h-1 w-1 rounded-full bg-amber" />
            REEL / 2024—2026
          </span>
          <span className="eyebrow hidden text-ink/55 sm:block">8 FILMS · 25 SECONDS</span>
        </div>

        <div className="flex items-end justify-between gap-8">
          <div className="max-w-[560px]">
            <h2 className="display text-[clamp(1.9rem,3.9vw,3.6rem)] leading-[1.05] text-ink">
              25 秒，
              <br />
              看 8 部片。
            </h2>
            <p className="mt-4 max-w-[34ch] text-[12.5px] leading-relaxed text-ink/55">
              建议开启声音。剪这一段的时候，我才发现这些片子其实在同一条线上。
            </p>
          </div>

          <Magnetic strength={0.22}>
            <button
              type="button"
              onClick={onPlayReel}
              data-cursor="view"
              data-cursor-label="播放"
              className="group relative flex h-[92px] w-[92px] shrink-0 flex-col items-center justify-center rounded-full border border-ink/20 bg-paper/90 text-ink shadow-[0_12px_40px_-18px_rgba(54,38,20,0.45)] backdrop-blur-sm transition-colors duration-500 hover:border-amber hover:bg-paper sm:h-[124px] sm:w-[124px]"
              aria-label="播放作品集短片"
            >
              <span className="absolute inset-2 rounded-full border border-ink/10 transition-transform duration-700 group-hover:scale-105" />
              <Play size={20} strokeWidth={1.2} fill="currentColor" className="ml-1 text-ink transition-colors duration-500 group-hover:text-amber" />
              <span className="mt-2 font-mono text-[8px] uppercase tracking-[0.22em] text-ink/50 transition-colors group-hover:text-ink/80">
                Play reel
              </span>
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
