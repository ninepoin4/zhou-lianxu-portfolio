import { Counter } from './Counter'
import { Reveal } from './Reveal'
import { microStats, stats } from '../data/content'

export function Numbers() {
  return (
    <section aria-label="数据" className="relative overflow-hidden border-y border-ink/15 bg-paper py-16 text-ink sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none font-serif text-[34vw] leading-none text-transparent opacity-60"
        style={{ WebkitTextStroke: '1px rgba(11,11,10,0.07)' }}
      >
        09
      </div>

      <div className="container-x relative">
        <div className="flex items-center justify-between">
          <span className="eyebrow text-ink/45">BY THE NUMBERS / 数据</span>
          <span className="eyebrow hidden text-ink/30 sm:block">NOT DECORATION</span>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-y-10 border-t border-ink/20 pt-8 lg:grid-cols-4 lg:gap-y-0">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <div className="group flex h-full flex-col justify-between gap-5 border-ink/12 pr-6 lg:border-r lg:pl-6 lg:first:pl-0 lg:last:border-r-0">
                <dd className="display text-[clamp(2.7rem,6vw,5.4rem)] leading-none tracking-tight text-ink">
                  <Counter value={stat.value} suffix={stat.suffix} suffixClassName="text-amber" />
                </dd>
                <div>
                  <dt className="text-[12px] tracking-[0.04em] text-ink/70">{stat.label}</dt>
                  <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/35">{stat.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </dl>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-ink/15 pt-7 sm:grid-cols-4">
          {microStats.map((item, index) => (
            <Reveal key={item.label} delay={0.05 + index * 0.04}>
              <div className="flex items-baseline gap-3">
                <span className="display text-[clamp(1.3rem,2.2vw,1.8rem)] leading-none text-ink/85">{item.value}</span>
                <div>
                  <p className="text-[11px] leading-tight text-ink/55">{item.label}</p>
                  <p className="mt-1 font-mono text-[7.5px] uppercase tracking-[0.12em] text-ink/30">{item.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 flex flex-wrap items-center gap-3 font-mono text-[8.5px] uppercase tracking-[0.18em] text-ink/35">
            <span className="h-1 w-1 rounded-full bg-amber" />
            数据会过期，方法不会。
            <span className="text-ink/20">/</span>
            DATA AS OF 2026.10
          </p>
        </Reveal>
      </div>
    </section>
  )
}
