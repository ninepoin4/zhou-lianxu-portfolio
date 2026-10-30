import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight, Play } from 'lucide-react'
import { MaskLines } from './Reveal'
import { Magnetic } from './Magnetic'
import { scrollToId } from '../lib/scroll'
import { contact, stats } from '../data/content'

const base = import.meta.env.BASE_URL

const contactSheet = [
  `${base}media/cases/yinguo-player.png`,
  `${base}media/clips/w02-pearlstory.jpg`,
  `${base}media/clips/w05-x9795.jpg`,
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
            <span className="eyebrow whitespace-nowrap text-ink/55">开放合作 · {contact.city}</span>
          </div>
        </motion.div>

        {/* main */}
        <div className="hero-main grid flex-1 grid-cols-1 items-center gap-10 py-6 sm:py-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6 xl:gap-12">
          <div className="relative z-10 max-w-[780px]">
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
                我是周连旭。把一句话，做成能交付的片子；也把<span className="whitespace-nowrap">重复劳动</span>，改写成可以复用的系统。五个项目，是同一条产线的五个出口。
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
                    data-cursor-label="看项目"
                  >
                    看 5 个项目
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
            <div className="relative w-[68vw] max-w-[264px] sm:w-[280px] lg:w-[clamp(238px,33vh,300px)]">
              {/* contact sheet */}
              <div className="absolute -left-[86px] top-6 hidden w-[68px] flex-col gap-1.5 xl:flex">
                {contactSheet.map((src) => (
                  <figure key={src} className="group relative overflow-hidden ring-1 ring-ink/10">
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="aspect-square w-full object-cover opacity-80 grayscale transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0"
                    />
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
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink/30" />
                </motion.div>
              </motion.div>
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
                  <dt className="order-2 text-[9.5px] tracking-[0.06em] text-ink/45">{stat.label}</dt>
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
              className="group flex items-center self-start sm:self-auto"
              aria-label="向下滚动"
            >
              <span className="relative h-10 w-px overflow-hidden bg-ink/15">
                <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_ease-in-out_infinite] bg-amber" />
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
