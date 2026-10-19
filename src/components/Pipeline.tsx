import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { ArrowUpRight, Terminal } from 'lucide-react'
import { pipeline, terminalLines } from '../data/content'
import { MaskLines, Reveal } from './Reveal'
import { scrollToId } from '../lib/scroll'

function useTypewriter(text: string, active: boolean, speed = 15) {
  const [value, setValue] = useState('')
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!active) return
    if (reduced) {
      setValue(text)
      return
    }
    let index = 0
    const id = window.setInterval(() => {
      index += 1
      setValue(text.slice(0, index))
      if (index >= text.length) window.clearInterval(id)
    }, speed)
    return () => window.clearInterval(id)
  }, [active, text, speed, reduced])

  return value
}

export function Pipeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)
  const terminalInView = useInView(terminalRef, { once: true, margin: '-15% 0px' })
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 0.8', 'end 0.75'] })
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  const cmd = terminalLines[0].text
  const typed = useTypewriter(cmd, terminalInView)
  const cmdDone = typed.length >= cmd.length

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index ?? 0)
            setActive(index)
          }
        }
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: 0 },
    )
    for (const el of stepRefs.current) if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="pipeline" ref={sectionRef} className="relative bg-[#e2e6da] py-20 text-ink sm:py-24 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(70% 55% at 15% 20%, rgba(200,118,60,0.12), transparent 65%), radial-gradient(50% 50% at 90% 80%, rgba(22,21,15,0.05), transparent 70%)',
        }}
      />
      <div className="container-x relative">
        <div className="flex items-center justify-between border-b border-ink/15 pb-4">
          <span className="eyebrow flex items-center gap-2 text-amber">
            <span className="h-1 w-1 rounded-full bg-amber" />
            03 / PIPELINE
          </span>
          <span className="eyebrow hidden text-ink/40 sm:block">一条能复用的产线</span>
          <span className="eyebrow text-ink/40">06 STEPS</span>
        </div>

        <div className="mt-12 grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
            <MaskLines
              className="display text-[clamp(2.1rem,4.6vw,4.4rem)] leading-[1.06]"
              delay={0.05}
              stagger={0.09}
              lines={[
                <span key="1">从一条提示词，</span>,
                <span key="2">
                  到 <span className="text-amber-soft">300</span> 条
                </span>,
                <span key="3">能交付的成片。</span>,
              ]}
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-[46ch] text-[13px] leading-[1.95] text-ink/60 sm:text-[13.5px]">
                这不是一个灵感合集，是一条被跑过很多次的产线：剧本有模板，生成有队列，
                配音有音色库，字幕有对齐，最后按项目分目录交付。今天跑普陀，明天跑戴拉。
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-8">
              <div ref={terminalRef} className="relative">
                <div className="overflow-hidden border border-ink/20 bg-[#0a0f0c] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
                  <div className="flex items-center justify-between border-b border-cream/10 px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <Terminal size={11} strokeWidth={1.4} className="text-amber" />
                      <span className="font-mono text-[9px] tracking-[0.14em] text-cream/45">build.py — zsh</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-cream/15" />
                      <span className="h-1.5 w-1.5 rounded-full bg-cream/15" />
                      <span className="h-1.5 w-1.5 rounded-full bg-amber/70" />
                    </div>
                  </div>
                  <div className="px-4 py-4 font-mono text-[10px] leading-[1.9] sm:text-[10.5px]">
                    <p className="text-amber-soft">
                      {typed}
                      {!cmdDone && <span className="ml-0.5 inline-block h-3 w-[6px] animate-pulse bg-amber align-middle" />}
                    </p>
                    {terminalLines.slice(1).map((line, index) => (
                      <motion.p
                        key={line.text}
                        className={
                          line.kind === 'out'
                            ? 'mt-2 border-t border-cream/10 pt-2 text-cream'
                            : 'text-cream/55'
                        }
                        initial={reduced ? undefined : { opacity: 0, x: -6 }}
                        animate={cmdDone ? { opacity: 1, x: 0 } : undefined}
                        transition={{ duration: 0.35, delay: 0.05 + index * 0.08 }}
                      >
                        <span className={line.kind === 'out' ? 'text-amber' : 'text-amber/80'}>{line.text.slice(0, 1)}</span>
                        <span className={line.kind === 'out' ? '' : ''}>{line.text.slice(1)}</span>
                      </motion.p>
                    ))}
                    {cmdDone && (
                      <p className="mt-3 flex items-center gap-2 text-cream/30">
                        <span className="text-amber">$</span>
                        <span className="inline-block h-3 w-[6px] animate-pulse bg-cream/50 align-middle" />
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.18em] text-ink/40">
                  <span>9:16 · 720×1280 · BATCH QUEUE</span>
                  <span>REAL LOG · 2026-10</span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="relative">
            <div className="absolute bottom-0 left-[7px] top-0 w-px bg-ink/15 sm:left-[11px]" />
            <motion.div
              className="absolute left-[7px] top-0 w-px origin-top bg-amber/80 sm:left-[11px]"
              style={{ scaleY: lineProgress, height: '100%' }}
            />
            <div className="flex flex-col">
              {pipeline.map((step, index) => {
                const isActive = active === index
                return (
                  <div
                    key={step.key}
                    ref={(el) => {
                      stepRefs.current[index] = el
                    }}
                    data-index={index}
                    className={`group relative pl-8 pb-9 transition-opacity duration-700 sm:pl-12 ${
                      isActive ? 'opacity-100' : 'opacity-45 hover:opacity-80'
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-2 flex h-[15px] w-[15px] items-center justify-center rounded-full border transition-all duration-500 sm:h-[23px] sm:w-[23px] ${
                        isActive ? 'border-amber bg-[#e2e6da]' : 'border-ink/25 bg-[#e2e6da]'
                      }`}
                    >
                      <span
                        className={`rounded-full transition-all duration-500 ${
                          isActive ? 'h-[5px] w-[5px] bg-amber' : 'h-[3px] w-[3px] bg-ink/30'
                        }`}
                      />
                    </span>
                    <div className="border-b border-ink/12 pb-8">
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="flex items-baseline gap-3">
                          <span className="font-mono text-[9px] tracking-[0.12em] text-amber/80">{step.index}</span>
                          <h3 className="display text-[clamp(1.6rem,3vw,2.4rem)] leading-none text-ink">
                            {step.title}
                          </h3>
                        </div>
                        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink/35">{step.en}</span>
                      </div>
                      <p className="mt-3 max-w-[52ch] text-[12.5px] leading-[1.85] text-ink/60 sm:text-[13px]">
                        {step.desc}
                      </p>
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {step.tools.map((tool) => (
                          <span
                            key={tool}
                            className="border border-ink/15 px-2 py-[3px] font-mono text-[8px] uppercase tracking-[0.1em] text-ink/45"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <Reveal>
              <button
                type="button"
                onClick={() => scrollToId('systems')}
                className="group mt-2 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/50 transition-colors hover:text-ink"
              >
                下一步：把产线封装成系统
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 transition-colors group-hover:border-amber group-hover:text-amber">
                  <ArrowUpRight size={13} strokeWidth={1.4} />
                </span>
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
