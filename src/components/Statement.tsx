import { MotionConfig } from 'motion/react'
import { MaskLines, Reveal } from './Reveal'
import { Marquee } from './Marquee'

const base = import.meta.env.BASE_URL

const principles = [
  { index: '01', title: '可复用', text: '一个模板，能跑一百条；换 SKU 不换方法。' },
  { index: '02', title: '可交付', text: '从 brief 到成片，字幕、调色、落版都能交接。' },
  { index: '03', title: '可部署', text: '本地工作台、FastAPI 出片台，换机器解压即用。' },
]

const marqueeWords = ['SCRIPT', 'GENERATE', 'VOICE', 'SUBTITLE', 'COMPOSE', 'DELIVER']

export function Statement() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="statement" className="relative overflow-hidden bg-paper py-20 text-ink sm:py-28 lg:py-32">
        <div className="pointer-events-none absolute inset-0 opacity-[0.35]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(11,11,10,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,11,10,0.055) 1px, transparent 1px)',
              backgroundSize: '96px 96px',
            }}
          />
        </div>

        <div className="container-x relative">
          <div className="border-b border-ink/15 pb-4">
            <span className="eyebrow text-ink/55">方法</span>
          </div>

          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[1fr_280px] lg:gap-20">
            <div>
              <MaskLines
                className="display max-w-[1100px] text-[clamp(1.95rem,5.4vw,5.05rem)] text-ink"
                delay={0.05}
                stagger={0.1}
                lines={[
                  <span key="1">我做的不是</span>,
                  <span key="2">
                    一条片子<span className="text-amber">，</span>
                  </span>,
                  <span key="3">
                    是一套能
                    <br className="sm:hidden" />
                    持续出片的方法。
                  </span>,
                ]}
              />

              <div className="mt-10 grid max-w-[62ch] gap-7 text-[13.5px] leading-[1.95] text-ink/65 sm:grid-cols-2 sm:gap-10 sm:text-[14px]">
                <Reveal delay={0.15}>
                  <p>
                    从剧本、生成、配音、字幕到花字与成片，每一步都被拆开、命名、存档。
                    下一次不必从零开始：改一个参数、换一组素材，再跑一遍。
                  </p>
                </Reveal>
                <Reveal delay={0.25}>
                  <p>
                    我喜欢把 AI 当成一条产线，而不是一次抽奖。好看的镜头靠运气，
                    稳定的交付靠流程、审美，还有愿意为一个画面重跑十次的耐心。
                  </p>
                </Reveal>
              </div>

            </div>

            <aside className="flex flex-col gap-8">
              <div className="border-t border-ink/20 pt-4">
                <p className="eyebrow text-ink/40">工作方式</p>
                <ul className="mt-5 flex flex-col">
                  {principles.map((item, index) => (
                    <Reveal key={item.index} delay={0.1 + index * 0.08}>
                      <li className="group flex gap-4 border-b border-ink/12 py-4">
                        <span className="mt-1 font-mono text-[9px] text-amber">{item.index}</span>
                        <div>
                          <p className="display text-lg leading-none">{item.title}</p>
                          <p className="mt-2 text-[12.5px] leading-relaxed text-ink/55">{item.text}</p>
                        </div>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>

              <Reveal delay={0.2}>
                <figure className="relative overflow-hidden">
                  <img
                    src={`${base}media/img/pearl-macro.jpg`}
                    alt="珍珠工艺特写"
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover grayscale-[0.2] transition-transform duration-[1.4s] ease-soft hover:scale-[1.04]"
                  />
                </figure>
              </Reveal>
            </aside>
          </div>
        </div>

        <div className="relative mt-16 border-y border-ink/15 py-4 sm:mt-20">
          <Marquee speed={38}>
            {marqueeWords.map((word, index) => (
              <span key={`${word}-${index}`} className="flex items-center">
                <span className="serif-en whitespace-nowrap px-6 text-[clamp(2.2rem,6vw,5.4rem)] uppercase leading-none tracking-tight text-ink/85">
                  {word}
                </span>
                <span className="text-[clamp(1rem,2vw,1.6rem)] text-amber">✳</span>
              </span>
            ))}
          </Marquee>
        </div>
      </section>
    </MotionConfig>
  )
}
