import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Circle } from 'lucide-react'
import { systems } from '../data/content'
import { MaskLines, Reveal } from './Reveal'

const base = import.meta.env.BASE_URL

export function Systems() {
  const [active, setActive] = useState(0)
  const current = systems[active]

  return (
    <section id="systems" className="relative overflow-hidden bg-paper py-20 text-ink sm:py-24 lg:py-28">
      <div className="container-x">
        <div className="flex items-center justify-between border-b border-ink/15 pb-4">
          <span className="eyebrow flex items-center gap-2 text-amber">
            <span className="h-1 w-1 rounded-full bg-amber" />
            04 / SYSTEMS
          </span>
          <span className="eyebrow hidden text-ink/40 sm:block">三个跑在业务里的东西</span>
          <span className="eyebrow text-ink/35">BUILT TO BE USED</span>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <MaskLines
              className="display max-w-[13ch] text-[clamp(2.1rem,4.8vw,4.6rem)] leading-[1.06] text-ink"
              delay={0.05}
              lines={[
                <span key="1">把能力，</span>,
                <span key="2">
                  封装成别人
                </span>,
                <span key="3">
                  能用的东西<span className="text-amber">。</span>
                </span>,
              ]}
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-[42ch] text-[13px] leading-[1.95] text-ink/60 sm:text-[13.5px]">
                模型再强，同事不会用就等于没有。这三个系统都从同一件事出发：
                把一次性的技巧，变成每天都能被打开的工作台。
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-8">
              <div className="relative">
                <div className="overflow-hidden border border-ink/20 bg-[#f2efe7] p-1.5 shadow-[0_40px_80px_-50px_rgba(11,11,10,0.55)]">
                  <div className="flex items-center justify-between border-b border-ink/10 px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <Circle size={5} className="fill-ink/20 text-ink/20" />
                      <Circle size={5} className="fill-ink/20 text-ink/20" />
                      <Circle size={5} className="fill-amber/70 text-amber/70" />
                    </div>
                    <span className="font-mono text-[8px] tracking-[0.16em] text-ink/40">
                      studio.local / {current.en.toLowerCase()}
                    </span>
                    <span className="font-mono text-[8px] text-ink/30">LIVE</span>
                  </div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-paper">
                    {systems.map((system, index) => (
                      <motion.img
                        key={system.id}
                        src={`${base}${system.image}`}
                        alt={`${system.title}界面`}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        className="absolute inset-0 h-full w-full object-cover object-top"
                        animate={{
                          opacity: active === index ? 1 : 0,
                          scale: active === index ? 1 : 1.035,
                        }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      />
                    ))}
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/10" />
                  </div>
                </div>
                <div className="mt-2.5 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.16em] text-ink/35">
                  <span>0{active + 1} — {current.title} / {current.en}</span>
                  <span>SCREENSHOT · 2026</span>
                </div>
              </div>
            </Reveal>

            <div className="mt-7 grid grid-cols-3 gap-3 border-t border-ink/15 pt-5">
              <div>
                <p className="display text-[clamp(1.4rem,2.4vw,2rem)] leading-none">3</p>
                <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-ink/40">系统在跑</p>
              </div>
              <div>
                <p className="display text-[clamp(1.4rem,2.4vw,2rem)] leading-none">
                  200<span className="text-amber">%</span>
                </p>
                <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-ink/40">出图提效</p>
              </div>
              <div>
                <p className="display text-[clamp(1.4rem,2.4vw,2rem)] leading-none">4 帧</p>
                <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-ink/40">一组验收</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="border-t border-ink/20">
              {systems.map((system, index) => {
                const isActive = active === index
                return (
                  <Reveal key={system.id} delay={0.05 * index}>
                    <button
                      type="button"
                      onPointerEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      onClick={() => setActive(index)}
                      aria-pressed={isActive}
                      data-cursor="link"
                      className={`group relative block w-full border-b border-ink/15 py-6 text-left transition-colors duration-500 sm:py-7 ${
                        isActive ? 'bg-ink/[0.035]' : 'bg-transparent'
                      }`}
                    >
                      <span
                        className={`absolute bottom-0 left-0 top-0 w-px bg-amber transition-transform duration-500 ${
                          isActive ? 'scale-y-100' : 'scale-y-0'
                        }`}
                      />
                      <div className="flex items-start justify-between gap-5 px-4 sm:px-5">
                        <div className="flex gap-4">
                          <span className="mt-1.5 font-mono text-[9px] tracking-[0.12em] text-amber">{system.index}</span>
                          <div>
                            <h3 className="display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.1] text-ink">
                              {system.title}
                            </h3>
                            <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.18em] text-ink/40">
                              {system.en}
                            </p>
                            <p className="mt-3 max-w-[40ch] text-[12.5px] leading-[1.85] text-ink/55">
                              {system.desc}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {system.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="border border-ink/15 px-2 py-[3px] font-mono text-[8px] uppercase tracking-[0.1em] text-ink/45"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-2">
                          <span className="display text-[clamp(1.3rem,2.2vw,1.8rem)] leading-none text-ink/80">
                            {system.metric}
                          </span>
                          <span className="max-w-[6rem] text-right font-mono text-[7.5px] uppercase tracking-[0.12em] text-ink/35">
                            {system.metricLabel}
                          </span>
                          <ArrowUpRight
                            size={14}
                            strokeWidth={1.3}
                            className={`mt-1 text-ink/30 transition-all duration-500 ${
                              isActive ? 'rotate-0 text-amber' : 'rotate-45'
                            }`}
                          />
                        </div>
                      </div>
                    </button>
                  </Reveal>
                )
              })}
            </div>

            <Reveal delay={0.15}>
              <p className="mt-8 max-w-[40ch] text-[12.5px] leading-[1.9] text-ink/50">
                <span className="serif-en italic text-[15px] text-ink/70">Tools are not the point.</span>
                <br />
                少一次重复，才算数。
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
