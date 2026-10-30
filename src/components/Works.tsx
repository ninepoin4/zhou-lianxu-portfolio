import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight, Play } from 'lucide-react'
import { projects, type Project } from '../data/content'
import { Player } from './Player'
import { MaskLines, Reveal } from './Reveal'
import { scrollToId } from '../lib/scroll'

const base = import.meta.env.BASE_URL

export type LightboxItem = {
  index: string
  title: string
  en: string
  client: string
  category: string
  year: string
  ratio: string
  duration: string
  mediaType: 'video' | 'image'
  src: string
  poster: string
  summary: string
  details: string
  deliverables: string[]
  metrics: { value: string; label: string }[]
  detailImage?: string
  detailCaption?: string
  tools: string[]
  role: string[]
  links?: { label: string; url: string }[]
}

export function projectToItem(project: Project): LightboxItem {
  return {
    index: project.index,
    title: project.title,
    en: project.en,
    client: project.client,
    category: project.category,
    year: project.year,
    ratio: project.ratio,
    duration: project.duration,
    mediaType: project.mediaType,
    src: project.src,
    poster: project.poster,
    summary: project.summary,
    details: project.details,
    deliverables: project.deliverables,
    metrics: project.metrics,
    detailImage: project.detailImage,
    detailCaption: project.detailCaption,
    tools: project.tools,
    role: project.role,
    links: project.links,
  }
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

function CaseChapter({
  project,
  position,
  onOpen,
}: {
  project: Project
  position: number
  onOpen: () => void
}) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const mediaY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  const imageRight = position % 2 === 0
  const tall = project.ratio === '9:16'
  const ratioClass = project.ratio === '16:9' ? 'aspect-[16/9]' : project.ratio === '16:10' ? 'aspect-[16/10]' : 'aspect-[9/16]'

  const textColumn = imageRight
    ? 'order-1 lg:order-1 lg:col-span-5'
    : `order-1 lg:order-2 lg:col-span-5 lg:pl-2 ${tall ? 'lg:col-start-7' : 'lg:col-start-8'}`
  const mediaColumn = imageRight
    ? 'order-2 lg:order-2 lg:col-span-7'
    : 'order-2 lg:order-1 lg:col-span-6 lg:col-start-1'

  return (
    <article
      id={`case-${project.id}`}
      ref={ref}
      data-case={project.index}
      className="relative scroll-mt-24 border-t border-ink/15 py-14 first:border-t-0 first:pt-10 sm:py-16 lg:py-24"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-16">
        <div className={textColumn}>
          <Reveal className="lg:sticky lg:top-28">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-[10px] tracking-[0.18em] text-amber">{project.index}</span>
              <span className="text-right font-mono text-[8px] uppercase tracking-[0.16em] text-ink/40">
                {project.category} · {project.year}
              </span>
            </div>

            <h3 className="display mt-4 text-[clamp(2.5rem,5.2vw,5rem)] leading-[0.98] text-ink">
              {project.title}
              <span className="text-amber">.</span>
            </h3>
            <p className="serif-en mt-2 text-[clamp(1.05rem,1.8vw,1.55rem)] italic leading-none text-ink/45">
              {project.en}
            </p>

            <p className="mt-6 max-w-[39ch] text-[13px] leading-[1.95] text-ink/65 sm:text-[13.5px]">
              {project.summary}
            </p>

            <div className="mt-7 grid grid-cols-3 gap-3 border-y border-ink/15 py-4">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="display whitespace-nowrap text-[clamp(0.98rem,1.45vw,1.35rem)] leading-none tracking-[-0.02em] text-ink">
                    {metric.value}
                  </p>
                  <p className="mt-2 font-mono text-[7.5px] uppercase leading-[1.5] tracking-[0.12em] text-ink/40">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tools.map((tool) => (
                <span key={tool} className="border border-ink/15 px-2 py-1 text-[10px] text-ink/50">
                  {tool}
                </span>
              ))}
            </div>

            {project.links?.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 border border-ink bg-ink px-3 py-1.5 text-[10.5px] tracking-[0.02em] text-cream transition-colors hover:border-amber hover:bg-amber hover:text-ink"
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

            <button
              type="button"
              onClick={onOpen}
              className="group mt-7 inline-flex items-center gap-2 border-b border-ink/25 pb-1 text-[12px] text-ink/75 transition-colors hover:border-amber hover:text-ink"
              data-cursor-label="打开"
            >
              打开案例
              <ArrowUpRight
                size={13}
                strokeWidth={1.4}
                className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
          </Reveal>
        </div>

        <div className={mediaColumn}>
          <motion.div
            className={`relative ${tall ? 'mx-auto flex w-full max-w-[600px] items-end justify-center gap-8 lg:mx-auto' : ''}`}
            initial={reduced ? undefined : { opacity: 0, y: 28 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 1, ease }}
          >
            <div className={tall ? 'w-[84%] max-w-[440px]' : 'w-full'}>
              <button
                type="button"
                onClick={onOpen}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
                onFocus={() => setHovered(true)}
                onBlur={() => setHovered(false)}
                className="group relative block w-full text-left"
                aria-label={`打开案例：${project.title}`}
                data-cursor-label={project.mediaType === 'video' ? '播放案例' : '打开案例'}
              >
                <motion.div
                  className={`relative overflow-hidden shadow-[0_26px_55px_-38px_rgba(30,22,14,0.45)] ring-1 ring-ink/15 ${ratioClass} ${
                    tall ? '' : 'max-sm:aspect-[4/5]'
                  } ${project.id === 'social' ? 'border-[7px] border-[#14130f] bg-[#14130f] sm:border-[10px]' : 'bg-ink/5'}`}
                  initial={reduced ? undefined : { clipPath: 'inset(0 0 100% 0)' }}
                  animate={inView || reduced ? { clipPath: 'inset(0 0 0% 0)' } : undefined}
                  transition={{ duration: 1.2, ease }}
                >
                  <motion.div className="absolute inset-0" style={reduced ? undefined : { y: mediaY }}>
                    {project.mediaType === 'video' ? (
                      <Player
                        src={project.src}
                        poster={project.poster}
                        play={hovered}
                        className="h-full w-full"
                        videoClassName="transition-transform duration-700 group-hover:scale-[1.02]"
                        label={project.title}
                      />
                    ) : (
                      <picture className="block h-full w-full">
                        {project.mobileSrc && (
                          <source media="(max-width: 639px)" srcSet={project.mobileSrc} />
                        )}
                        <img
                          src={project.src}
                          alt={`${project.title} 案例视觉`}
                          loading="lazy"
                          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] ${
                            project.mobileSrc
                              ? 'max-sm:object-center'
                              : project.id === 'matrix'
                                ? 'max-sm:object-[80%_center]'
                                : 'max-sm:object-[74%_center]'
                          }`}
                        />
                      </picture>
                    )}
                  </motion.div>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-80" />

                  <div className="absolute left-0 top-0 z-10 flex items-center gap-2 bg-paper/90 px-3 py-2 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                    <span className="font-mono text-[7.5px] uppercase tracking-[0.18em] text-ink/55">
                      {project.kind === 'interactive' ? 'INTERACTIVE' : project.mediaType === 'video' ? 'FILM' : 'SYSTEM'} / {project.index}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cream/55 bg-ink/25 text-cream backdrop-blur-sm transition-all duration-500 group-hover:border-amber group-hover:bg-amber group-hover:text-ink">
                    {project.mediaType === 'video' ? (
                      <Play size={11} strokeWidth={1.6} fill="currentColor" className="ml-0.5" />
                    ) : (
                      <ArrowUpRight size={14} strokeWidth={1.4} />
                    )}
                  </div>
                </motion.div>

                <div className="mt-3 flex items-center justify-between gap-4">
                  <span className="font-mono text-[7.5px] uppercase tracking-[0.16em] text-ink/40">
                    FIG. {project.index} — {project.title}
                  </span>
                  <span className="font-mono text-[7.5px] uppercase tracking-[0.14em] text-ink/35">
                    {project.ratio} / {project.duration}
                  </span>
                </div>
              </button>
            </div>

            {tall && (
              <div className="hidden w-[92px] shrink-0 flex-col items-center gap-4 pb-8 lg:flex">
                <p
                  className="font-mono text-[8px] uppercase tracking-[0.26em] text-ink/40"
                  style={{ writingMode: 'vertical-rl' }}
                >
                  9:16 / VERTICAL / 2026
                </p>
                <span className="h-20 w-px bg-ink/20" />
                <span className="serif-en text-[2.2rem] italic leading-none text-amber">{project.index}</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </article>
  )
}

export function Works({ onOpen }: { onOpen: (item: LightboxItem) => void }) {
  const [active, setActive] = useState('01')

  useEffect(() => {
    const chapters = Array.from(document.querySelectorAll<HTMLElement>('[data-case]'))
    if (!chapters.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.getAttribute('data-case') ?? '01')
      },
      { rootMargin: '-28% 0px -55% 0px', threshold: [0, 0.08, 0.25, 0.5] },
    )
    chapters.forEach((chapter) => observer.observe(chapter))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="works" className="relative overflow-hidden bg-paper py-16 text-ink sm:py-20 lg:py-24">
      <div className="container-x relative">
        <div className="flex items-center justify-between border-b border-ink/15 pb-4">
          <span className="eyebrow flex items-center gap-2 text-amber">
            <span className="h-1 w-1 rounded-full bg-amber" />
            02 / SELECTED 05
          </span>
          <span className="eyebrow text-ink/40">2024 — 2026</span>
        </div>

        <div className="mt-9 grid gap-7 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
          <MaskLines
            className="display text-[clamp(2.8rem,6.6vw,6.4rem)] leading-[0.94] text-ink"
            lines={[
              <span key="1">只留下</span>,
              <span key="2">
                五个项目<span className="text-amber">。</span>
              </span>,
            ]}
          />
          <Reveal delay={0.12}>
            <p className="max-w-[35ch] text-[13px] leading-[1.95] text-ink/60 lg:justify-self-end">
              从 8 个项目里，留下 5 条能说明方法的。它们不是五种风格，是同一条链路的不同出口。
            </p>
          </Reveal>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-ink/15 pt-4">
          {projects.map((project) => {
            const isActive = active === project.index
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => scrollToId(`case-${project.id}`, -88)}
                className={`group flex items-center gap-2 border-b pb-2 text-left transition-colors ${
                  isActive ? 'border-amber text-ink' : 'border-transparent text-ink/55 hover:text-ink'
                }`}
              >
                <span className={`font-mono text-[9px] tracking-[0.14em] ${isActive ? 'text-amber' : 'text-ink/35'}`}>
                  {project.index}
                </span>
                <span className="text-[12.5px] tracking-[0.02em]">{project.title}</span>
              </button>
            )
          })}
          <span className="ml-auto hidden font-mono text-[8px] uppercase tracking-[0.18em] text-ink/30 sm:block">
            {String(projects.length).padStart(2, '0')} CASES /{' '}
            {String(projects.filter((project) => project.kind === 'interactive').length).padStart(2, '0')} INTERACTIVE /{' '}
            {String(projects.filter((project) => project.kind === 'system').length).padStart(2, '0')} SYSTEM
          </span>
        </div>

        <div className="mt-12 flex flex-col lg:mt-16">
          {projects.map((project, index) => (
            <CaseChapter
              key={project.id}
              project={project}
              position={index}
              onOpen={() => onOpen(projectToItem(project))}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-ink/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[44ch] text-[12px] leading-[1.8] text-ink/50">
            五个项目，同一条产线。剩下的不是被删掉，是被收进了方法里。
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <button
              type="button"
              onClick={() => scrollToId('pipeline')}
              className="group flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/55 transition-colors hover:text-ink"
            >
              看它们怎么被做出来
              <ArrowDown size={11} strokeWidth={1.4} className="transition-transform duration-500 group-hover:translate-y-1" />
            </button>
            <a
              href={`${base}room/`}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 border border-ink/25 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/70 transition-colors hover:border-ink hover:bg-ink hover:text-cream"
              data-cursor-label="走进"
            >
              走进 3D 房间
              <ArrowUpRight size={11} strokeWidth={1.4} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute right-5 top-1/3 hidden 2xl:block"
        aria-hidden="true"
      >
        <p
          className="font-mono text-[7px] uppercase tracking-[0.4em] text-ink/25"
          style={{ writingMode: 'vertical-rl' }}
        >
          SELECTED WORKS / 2024—2026
        </p>
      </div>
    </section>
  )
}
