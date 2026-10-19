import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, type MotionValue } from 'motion/react'
import { ArrowUpRight, Play } from 'lucide-react'
import { categories, films, type Category, type Film } from '../data/content'
import { Player } from './Player'
import { Reveal } from './Reveal'
import { scrollToId } from '../lib/scroll'

export type LightboxItem = {
  id: string
  title: string
  en?: string
  client?: string
  src: string
  poster: string
  ratio: '16:9' | '9:16'
  desc?: string
  tools?: string[]
  role?: string[]
  duration?: string
  year?: string
  index?: string
}

export function filmToItem(film: Film): LightboxItem {
  return {
    id: film.id,
    title: film.title,
    en: film.en,
    client: film.client,
    src: film.clip,
    poster: film.poster,
    ratio: film.ratio,
    desc: film.desc,
    tools: film.tools,
    role: film.role,
    duration: film.duration,
    year: film.year,
    index: film.index,
  }
}

function useFinePointer() {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(pointer: fine)')
    setFine(query.matches)
    const onChange = () => setFine(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return fine
}

function HoverPreview({ film, x, y }: { film: Film | null; x: MotionValue<number>; y: MotionValue<number> }) {
  const width = film?.ratio === '16:9' ? 400 : 252
  const height = film?.ratio === '16:9' ? 225 : 448

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
      style={{ x, y, width }}
    >
      <AnimatePresence mode="wait">
        {film && (
          <motion.div
            key={film.id}
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.28 } }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="relative overflow-hidden bg-ink2 ring-1 ring-cream/20"
            style={{ height }}
          >
            <Player src={film.clip} poster={film.poster} play={true} className="h-full w-full" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/85 to-transparent px-3 pb-2.5 pt-8">
              <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-cream/80">
                {film.index} / {film.en}
              </span>
              <span className="font-mono text-[8px] text-cream/50">{film.duration}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Works({ onOpen }: { onOpen: (index: number) => void }) {
  const [category, setCategory] = useState<Category>('全部')
  const [hovered, setHovered] = useState<Film | null>(null)
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const listRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 320, damping: 32, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 320, damping: 32, mass: 0.6 })

  const filtered = useMemo(
    () => (category === '全部' ? films : films.filter((film) => film.category === category)),
    [category],
  )

  const counts = useMemo(() => {
    const map: Record<string, number> = { 全部: films.length }
    for (const film of films) map[film.category] = (map[film.category] ?? 0) + 1
    return map
  }, [])

  const movePreview = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!fine || reduced) return
    const width = hovered?.ratio === '16:9' ? 400 : 252
    const height = hovered?.ratio === '16:9' ? 225 : 448
    const gap = 28
    const maxX = window.innerWidth - width - 20
    const maxY = window.innerHeight - height - 20
    const nextX = event.clientX + gap + width > window.innerWidth - 16 ? event.clientX - width - gap : event.clientX + gap
    x.set(Math.max(16, Math.min(nextX, maxX)))
    y.set(Math.max(16, Math.min(event.clientY - height / 2, maxY)))
  }

  return (
    <section id="works" className="relative overflow-hidden bg-paper py-20 text-ink sm:py-24 lg:py-32">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6 border-b border-ink/15 pb-6">
          <div>
            <Reveal>
              <span className="eyebrow flex items-center gap-2 text-amber">
                <span className="h-1 w-1 rounded-full bg-amber" />
                02 / SELECTED FILMS
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display mt-4 text-[clamp(2.8rem,7vw,6.2rem)] leading-none text-ink">
                片目<span className="text-amber">.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="hidden text-right sm:block">
            <p className="display text-[clamp(1.3rem,2.4vw,2.1rem)] leading-tight text-ink/85">
              12 部精选 / 300+ 条在硬盘里
            </p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35">
              点击任意一条，播放片段
            </p>
          </Reveal>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
          <div className="flex flex-wrap gap-x-7 gap-y-2" role="tablist" aria-label="作品分类">
            {categories.map((item) => {
              const active = category === item
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(item)}
                  className={`relative flex items-baseline gap-1.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                    active ? 'text-ink' : 'text-ink/40 hover:text-ink/70'
                  }`}
                >
                  {item}
                  <span className={`text-[8px] ${active ? 'text-amber' : 'text-ink/25'}`}>
                    {counts[item] ?? 0}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="category-underline"
                      className="absolute inset-x-0 bottom-0 h-px bg-amber"
                      transition={{ type: 'spring', stiffness: 400, damping: 36 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink/30 md:block">
            HOVER TO PREVIEW · CLICK TO PLAY
          </span>
        </div>

        <div ref={listRef} onPointerMove={movePreview} className="mt-4 border-t border-ink/15">
          <AnimatePresence initial={false} mode="popLayout">
            {filtered.map((film, index) => (
              <motion.div
                key={film.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  onClick={() => onOpen(films.findIndex((item) => item.id === film.id))}
                  onPointerEnter={() => setHovered(film)}
                  onPointerLeave={() => setHovered(null)}
                  onFocus={() => setHovered(film)}
                  onBlur={() => setHovered(null)}
                  data-cursor="view"
                  data-cursor-label="播放"
                  className="group relative block w-full border-b border-ink/12 py-4 text-left sm:py-5"
                  aria-label={`播放 ${film.title}`}
                >
                  <span className="absolute inset-0 -z-0 bg-gradient-to-r from-ink/[0.045] via-ink/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-amber/70 transition-all duration-700 ease-soft group-hover:w-full" />

                  <div className="relative grid grid-cols-[28px_1fr_auto] items-center gap-3 sm:grid-cols-[48px_1.35fr_1fr_108px_44px] sm:gap-5">
                    <span className="self-start pt-1 font-mono text-[9px] tracking-[0.1em] text-ink/30 transition-colors duration-300 group-hover:text-amber sm:pt-0 sm:text-[10px]">
                      {film.index}
                    </span>

                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                      <img
                        src={film.poster}
                        alt=""
                        loading="lazy"
                        className="h-14 w-14 shrink-0 object-cover opacity-80 sm:hidden"
                      />
                      <div className="min-w-0">
                        <h3 className="display truncate text-[clamp(1.35rem,3vw,2.45rem)] leading-[1.1] text-ink transition-transform duration-500 ease-soft group-hover:translate-x-1.5">
                          {film.title}
                        </h3>
                        <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/45 sm:flex-nowrap sm:overflow-hidden">
                          <span className="text-ink/60">{film.en}</span>
                          <span className="text-ink/20">/</span>
                          <span>{film.client}</span>
                        </p>
                      </div>
                    </div>

                    <div className="hidden flex-wrap gap-1.5 sm:flex">
                      {film.tools.slice(0, 2).map((tool) => (
                        <span
                          key={tool}
                          className="border border-ink/15 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-ink/45 transition-colors duration-500 group-hover:border-ink/30 group-hover:text-ink/75"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <div className="hidden flex-col items-end gap-1 font-mono text-[9px] tracking-[0.12em] text-ink/40 sm:flex">
                      <span className="text-ink/55">{film.year} · {film.duration}</span>
                      <span className="text-ink/30">{film.ratio}</span>
                    </div>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink/50 transition-all duration-500 group-hover:border-amber group-hover:bg-amber group-hover:text-ink sm:h-10 sm:w-10">
                      <Play size={11} strokeWidth={1.5} fill="currentColor" className="ml-0.5" />
                    </span>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <p className="max-w-[52ch] text-[12.5px] leading-relaxed text-ink/50">
              还有口播、卡点、短剧与参考片拆解留在工作盘里。它们不一定好看，
              但每一条都回答过一个问题：这次能不能再快一点。
            </p>
            <button
              type="button"
              onClick={() => scrollToId('pipeline')}
              className="group flex items-center gap-3 self-start text-[12px] text-ink/60 transition-colors hover:text-ink sm:self-auto"
            >
              看它们是怎么被做出来的
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 transition-colors duration-500 group-hover:border-amber group-hover:text-amber">
                <ArrowUpRight size={13} strokeWidth={1.4} />
              </span>
            </button>
          </div>
        </Reveal>
      </div>

      {fine && <HoverPreview film={hovered} x={sx} y={sy} />}
    </section>
  )
}
