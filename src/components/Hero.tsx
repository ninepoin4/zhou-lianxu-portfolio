import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight, Play } from 'lucide-react'
import { MaskLines } from './Reveal'
import { Magnetic } from './Magnetic'
import { Timecode } from './Timecode'
import { DotsMark } from './DotsMark'
import { scrollToId } from '../lib/scroll'
import { contact, stats } from '../data/content'

const base = import.meta.env.BASE_URL

const contactSheet = [
  { src: `${base}media/clips/w04-putuo.jpg`, label: 'PUTUO' },
  { src: `${base}media/clips/w02-pearlstory.jpg`, label: 'PEARL' },
  { src: `${base}media/clips/w05-x9795.jpg`, label: 'X9795' },
]

export function Hero({ ready, onPlayReel }: { ready: boolean; onPlayReel: () => void }) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  const windowY = useTransform(scrollYProgress, [0, 1], ['0%', '9%'])

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 55, damping: 18, mass: 0.6 })
  const smoothY = useSpring(pointerY, { stiffness: 55, damping: 18, mass: 0.6 })

  const tiltX = useTransform(smoothY, [-1, 1], [4, -4])
  const tiltY = useTransform(smoothX, [-1, 1], [-5, 5])

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1)
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1)
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        pointerX.set(0)
        pointerY.set(0)
      }}
      className="hero-compact relative min-h-[100svh] w-full overflow-hidden bg-paper pb-0 pt-20 text-ink sm:pt-24"
    >
      {/* paper texture */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(22,21,15,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(22,21,15,0.05) 1px, transparent 1px)',
            backgroundSize: '96px 96px',
          }}
        />
        <div className="absolute -right-[18%] -top-[26%] h-[68vw] w-[68vw] rounded-full bg-[radial-gradient(circle,rgba(200,118,60,0.16),transparent_64%)]" />
        <div className="absolute -left-[20%] bottom-[-30%] h-[52vw] w-[52vw] rounded-full bg-[radial-gradient(circle,rgba(120,140,110,0.12),transparent_66%)]" />
      </div>

      <div className="container-x relative z-10 flex min-h-[calc(100svh-9rem)] flex-col">
        {/* meta row */}
        <motion.div
          className="flex items-start justify-between gap-6 border-b border-ink/15 pb-4"
          initial={reduced ? undefined : { opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
            </span>
            <span className="eyebrow whitespace-nowrap text-ink/55">OPEN TO WORK · {contact.city}</span>
          </div>
          <span className="eyebrow hidden text-ink/35 md:block">35.05°N / 118.35°E</span>
          <span className="eyebrow whitespace-nowrap text-ink/45">
            <span className="sm:hidden">2026</span>
            <span className="hidden sm:inline">PORTFOLIO 2024—2026</span>
          </span>
        </motion.div>

        {/* main */}
        <div className="hero-main grid flex-1 grid-cols-1 items-center gap-10 py-6 sm:py-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6 xl:gap-12">
          <div className="relative z-10 max-w-[780px]">
            <motion.div
              className="mb-5 flex items-center gap-3 sm:mb-7"
              initial={reduced ? undefined : { opacity: 0 }}
              animate={ready ? { opacity: 1 } : undefined}
              transition={{ duration: 0.9, delay: 0.5 }}
            >
              <DotsMark size={14} className="text-ink/80" />
              <span className="eyebrow text-ink/55">AI 影像 / 工作流 / 部署</span>
            </motion.div>

            <MaskLines
              ready={ready}
              delay={0.35}
              stagger={0.09}
              className="hero-title display text-[clamp(3.05rem,7.7vw,7.4rem)] text-ink"
              lineClassName="flex flex-wrap items-baseline gap-x-4"
              lines={[
                <span key="1" className="flex items-baseline gap-3 sm:gap-5">
                  把
                  <span className="serif-en italic text-[1.02em] tracking-tight text-amber">AI</span>
                </span>,
                <span key="2">做成一条</span>,
                <span key="3" className="flex flex-wrap items-baseline gap-x-3">
                  生产线<span className="text-amber">。</span>
                  <span className="mb-2 hidden font-mono text-[9px] uppercase tracking-[0.22em] text-ink/35 sm:inline">
                    (the one that ships)
                  </span>
                </span>,
              ]}
            />

            <div className="mt-6 grid gap-8 sm:grid-cols-[1.4fr_1fr] sm:items-end">
              <motion.p
                className="max-w-[46ch] text-[13.5px] leading-[1.95] text-ink/60 sm:text-[14.5px]"
                initial={reduced ? undefined : { opacity: 0, y: 18 }}
                animate={ready ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 1, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                我是周连旭。用 ComfyUI、Wan、HyperFrames 和一点偏执，把想法变成能交付的片子；
                也把重复劳动，改写成可以复用的系统。
              </motion.p>

              <motion.div
                className="flex flex-col items-start gap-4"
                initial={reduced ? undefined : { opacity: 0, y: 18 }}
                animate={ready ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Magnetic strength={0.2}>
                  <button
                    type="button"
                    onClick={() => scrollToId('works')}
                    className="group flex items-center gap-4 bg-ink px-5 py-3.5 text-[13px] tracking-[0.04em] text-cream transition-colors duration-500 hover:bg-amber hover:text-ink"
                    data-cursor-label="看片"
                  >
                    看片目
                    <ArrowDown size={15} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-y-1" />
                  </button>
                </Magnetic>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <button
                    type="button"
                    onClick={onPlayReel}
                    className="group flex items-center gap-2.5 text-[12px] text-ink/70 transition-colors hover:text-ink"
                    data-cursor-label="播放"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/25 transition-colors duration-500 group-hover:border-amber group-hover:bg-amber group-hover:text-ink">
                      <Play size={10} strokeWidth={1.6} fill="currentColor" className="ml-0.5" />
                    </span>
                    播放作品集
                    <span className="font-mono text-[9px] text-ink/35">25s</span>
                  </button>
                  <a
                    href={`${base}resume/zhou-lianxu-resume.pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/45 transition-colors hover:text-ink"
                  >
                    简历 PDF
                    <ArrowUpRight size={12} strokeWidth={1.4} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* film window */}
          <motion.div
            className="relative z-0 mx-auto flex w-full max-w-[300px] flex-col items-center lg:mx-0 lg:ml-auto lg:max-w-[320px]"
            style={{ y: windowY }}
          >
            <div className="hidden w-full items-center justify-between pb-3 font-mono text-[8.5px] uppercase tracking-[0.24em] text-ink/35 lg:flex">
              <span>SHOWREEL / NOW LOOPING</span>
              <span>09 : 16</span>
            </div>

            <div className="relative w-[68vw] max-w-[264px] sm:w-[280px] lg:w-[clamp(238px,33vh,300px)]">
              {/* contact sheet */}
              <div className="absolute -left-[86px] top-6 hidden w-[68px] flex-col gap-1.5 xl:flex">
                <span className="mb-1 font-mono text-[8px] uppercase tracking-[0.24em] text-ink/35">Contact sheet</span>
                {contactSheet.map((item) => (
                  <figure key={item.label} className="group relative overflow-hidden ring-1 ring-ink/10">
                    <img
                      src={item.src}
                      alt=""
                      loading="lazy"
                      className="aspect-square w-full object-cover opacity-80 grayscale transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                    <span className="absolute bottom-1 left-1 font-mono text-[7px] tracking-[0.16em] text-cream/80 drop-shadow">
                      {item.label}
                    </span>
                  </figure>
                ))}
              </div>

              <motion.div
                style={{ rotateX: reduced ? 0 : tiltX, rotateY: reduced ? 0 : tiltY, transformPerspective: 1000 }}
                className="relative"
              >
                <motion.div
                  className="relative aspect-[9/16] w-full overflow-hidden bg-ink2 shadow-[0_36px_80px_-38px_rgba(54,38,20,0.55)] ring-1 ring-ink/20"
                  initial={reduced ? undefined : { clipPath: 'inset(100% 0% 0% 0%)' }}
                  animate={ready ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
                  transition={{ duration: 1.2, delay: 0.55, ease: [0.76, 0, 0.24, 1] }}
                  data-cursor-label="9:16"
                >
                  <motion.video
                    className="h-full w-full object-cover"
                    src={`${base}media/clips/window.mp4`}
                    poster={`${base}media/clips/window.jpg`}
                    autoPlay={!reduced}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    tabIndex={-1}
                    aria-label="珍珠戒指环绕镜头"
                    initial={reduced ? undefined : { scale: 1.22 }}
                    animate={ready ? { scale: 1 } : undefined}
                    transition={{ duration: 1.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.18]"
                    style={{
                      background:
                        'repeating-linear-gradient(to bottom, rgba(0,0,0,0.55) 0px, rgba(0,0,0,0.55) 1px, transparent 1px, transparent 3px)',
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/35 via-transparent to-ink/55" />

                  {/* HUD — light-on-dark inside the video */}
                  <div className="absolute inset-0 p-3">
                    <div className="flex items-start justify-between">
                      <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-cream/80">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber" />
                        REC
                      </span>
                      <Timecode className="text-[8px] tracking-[0.12em] text-cream/70" />
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div className="flex flex-col gap-1 font-mono text-[7.5px] uppercase tracking-[0.18em] text-cream/65">
                        <span>YJ6976001 / 360° ORBIT</span>
                        <span className="text-cream/40">9:16 · SILENT · LOOP</span>
                      </div>
                      <span className="font-mono text-[7.5px] text-cream/50">30FPS</span>
                    </div>
                    <span className="absolute left-1 top-1 h-3 w-3 border-l border-t border-cream/40" />
                    <span className="absolute right-1 top-1 h-3 w-3 border-r border-t border-cream/40" />
                    <span className="absolute bottom-1 left-1 h-3 w-3 border-b border-l border-cream/40" />
                    <span className="absolute bottom-1 right-1 h-3 w-3 border-b border-r border-cream/40" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-cream/15">
                    <div
                      className="h-full bg-amber"
                      style={{ animation: reduced ? undefined : 'playhead 9s linear infinite' }}
                    />
                  </div>
                </motion.div>
              </motion.div>

              <div className="mt-3 flex items-center justify-between font-mono text-[8.5px] uppercase tracking-[0.2em] text-ink/35">
                <span>© ZHOU LIANXU</span>
                <span>{contact.city} · CN</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* bottom row */}
        <motion.div
          className="relative z-10 mt-auto border-t border-ink/15 pt-5"
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4 sm:gap-x-12">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <dt className="order-2 font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/40">{stat.label}</dt>
                  <dd className="order-1 display text-[22px] leading-none text-ink sm:text-[26px]">
                    {stat.value.toLocaleString('en-US')}
                    <span className="text-amber">{stat.suffix}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <button
              type="button"
              onClick={() => scrollToId('statement')}
              className="group flex items-center gap-4 self-start sm:self-auto"
              aria-label="向下滚动"
            >
              <span className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-ink/40 transition-colors group-hover:text-ink/70">
                Scroll to explore
              </span>
              <span className="relative h-10 w-px overflow-hidden bg-ink/15">
                <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_ease-in-out_infinite] bg-amber" />
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* availability ticker */}
      <div className="relative z-10 mt-4 overflow-hidden border-y border-ink/10 bg-ink/[0.02] py-1.5">
        <div className="marquee-track flex w-max" style={{ ['--marquee-duration' as string]: '36s' }}>
          {[0, 1].map((group) => (
            <div key={group} className="flex shrink-0 items-center" aria-hidden={group === 1}>
              {[
                'OPEN TO WORK',
                'AI 产品 / 工作流 / 部署',
                '杭州 · 一周内到岗',
                '400 万+ 播放',
                '200% 出图提效',
                '把 AI 做成一条生产线',
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-5 whitespace-nowrap px-5 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/40"
                >
                  {item}
                  <span className="h-1 w-1 rounded-full bg-amber/70" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
