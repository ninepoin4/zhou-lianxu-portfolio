import { ArrowUpRight, Download } from 'lucide-react'
import { Reveal } from './Reveal'
import { DotsMark } from './DotsMark'
import { contact, education, experience, skillGroups, socials } from '../data/content'

const base = import.meta.env.BASE_URL

export function About() {
  return (
    <section id="about" className="relative bg-[#e8e3d6] py-20 text-ink sm:py-24 lg:py-28">
      <div className="container-x">
        <div className="flex items-center justify-between border-b border-ink/15 pb-4">
          <span className="eyebrow flex items-center gap-2 text-amber">
            <span className="h-1 w-1 rounded-full bg-amber" />
            05 / ABOUT
          </span>
          <span className="eyebrow hidden text-ink/40 sm:block">技术是我的手，叙事是我的眼</span>
          <span className="eyebrow text-ink/40">周连旭 / ZHOU LIANXU</span>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[350px_1fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
            <Reveal>
              <figure className="group relative">
                <div className="relative overflow-hidden bg-ink2 ring-1 ring-ink/15">
                  <img
                    src={`${base}media/img/portrait.jpg`}
                    alt="周连旭肖像"
                    className="aspect-[4/5] w-full object-cover object-top grayscale transition-all duration-[1.2s] ease-soft group-hover:grayscale-0"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                  <span className="absolute left-3 top-3 font-mono text-[8px] uppercase tracking-[0.2em] text-cream/50">
                    PORTRAIT / 2026
                  </span>
                  <span className="absolute bottom-3 right-3 font-mono text-[8px] uppercase tracking-[0.18em] text-cream/50">
                    35.05°N
                  </span>
                </div>
                <figcaption className="mt-3 flex items-start justify-between">
                  <div>
                    <p className="display text-2xl leading-none text-ink">周连旭</p>
                    <p className="mt-1.5 font-mono text-[8.5px] uppercase tracking-[0.18em] text-ink/45">
                      ZHOU LIANXU
                    </p>
                  </div>
                  <DotsMark size={18} className="mt-1 text-ink/70" />
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-5 text-[13px] leading-relaxed text-ink/60">
                AI 产品经理 / 工作流工程师 / 部署
              </p>
              <ul className="mt-5 flex flex-col gap-2 border-t border-ink/12 pt-4 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/40">
                <li className="flex justify-between gap-4">
                  <span>BASE</span>
                  <span className="text-ink/65">临沂 → 杭州</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>STATUS</span>
                  <span className="text-amber">可入职 · 一周内</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>DEGREE</span>
                  <span className="text-ink/65">本科 · 营销管理</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>EXPERIENCE</span>
                  <span className="text-ink/65">1 年 · AI 应用</span>
                </li>
              </ul>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="link-line text-[12px] text-ink/70 hover:text-ink"
                >
                  {contact.email}
                </a>
                <a
                  href={`${base}resume/zhou-lianxu-resume.pdf`}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/45 transition-colors hover:text-ink"
                >
                  <Download size={11} strokeWidth={1.4} />
                  简历 PDF
                </a>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/45 transition-colors hover:text-ink"
                  >
                    {social.label}
                    <span className="text-[8px] text-ink/30 group-hover:text-amber">{social.stat}</span>
                  </a>
                ))}
              </div>
            </Reveal>
          </aside>

          <div>
            <Reveal>
              <h2 className="display max-w-[18ch] text-[clamp(1.9rem,4.2vw,3.9rem)] leading-[1.12] text-ink">
                技术是我的手，
                <br />
                叙事是我的<span className="text-amber-soft">眼</span>。
              </h2>
            </Reveal>

            <div className="mt-7 grid gap-6 text-[13px] leading-[1.95] text-ink/65 sm:grid-cols-2 sm:gap-10 sm:text-[13.5px]">
              <Reveal delay={0.05}>
                <p>
                  2025 年毕业，学的是营销管理，进的是电商公司 IT 部。不到一年里，
                  我从 0 搭起 ComfyUI 后端与 WebUI 前端，让美工和运营能直接出图；
                  也用 Coze / Dify 把重复的设计流程做成模板。美工部整体提效 200%。
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  更早之前，我写网文、做电子音乐、运营 B 站和小红书。文字教我节奏，
                  音乐教我情绪，短视频教我如何在三秒内留住一个人。现在，我把它们放进同一套工作流。
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <blockquote className="mt-10 border-l border-amber/60 pl-5 sm:pl-7">
                <p className="serif-en text-[clamp(1.35rem,2.5vw,2rem)] italic leading-[1.35] text-ink/80">
                  “The part that actually ships — that is the craft.”
                </p>
                <footer className="mt-3 font-mono text-[8.5px] uppercase tracking-[0.2em] text-ink/45">
                  现在我在找一件事：把 AI 真正落到业务里。不是演示，是每天有人用。
                </footer>
              </blockquote>
            </Reveal>

            <div className="mt-12">
              <div className="flex items-baseline justify-between border-b border-ink/15 pb-3">
                <h3 className="eyebrow text-ink/50">经历 / EXPERIENCE</h3>
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/30">2024 — 2026</span>
              </div>

              <div className="mt-6 flex flex-col">
                {experience.map((job, index) => (
                  <Reveal key={job.company} delay={index * 0.04}>
                    <article className="group grid grid-cols-1 gap-3 border-b border-ink/12 py-6 sm:grid-cols-[130px_1fr] sm:gap-6">
                      <div className="flex sm:flex-col sm:gap-2">
                        <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink/40">
                          {job.period}
                        </span>
                        <span className="ml-auto font-mono text-[8px] text-amber/60 sm:ml-0">
                          0{index + 1}
                        </span>
                      </div>
                      <div>
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h4 className="display text-xl leading-none text-ink sm:text-2xl">{job.company}</h4>
                          <span className="text-[12px] text-ink/55">{job.role}</span>
                        </div>
                        <p className="mt-1.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-ink/40">
                          {job.note}
                        </p>
                        <ul className="mt-3 flex flex-col gap-1.5">
                          {job.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-2.5 text-[12.5px] leading-relaxed text-ink/60">
                              <span className="mt-[0.55em] h-[3px] w-[3px] shrink-0 rounded-full bg-ink/30" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                        {job.highlight && (
                          <p className="mt-3 inline-block border border-amber/40 px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.1em] text-amber">
                            {job.highlight}
                          </p>
                        )}
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>

              <Reveal>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-b border-ink/12 pb-5">
                  <div className="flex items-baseline gap-3">
                    <h4 className="display text-lg text-ink/85">{education.school}</h4>
                    <span className="text-[12px] text-ink/50">{education.major}</span>
                  </div>
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink/35">
                    {education.period}
                  </span>
                </div>
              </Reveal>
            </div>

            <div className="mt-12">
              <div className="flex items-baseline justify-between border-b border-ink/15 pb-3">
                <h3 className="eyebrow text-ink/50">技能 / STACK</h3>
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/30">TOOLS & CRAFT</span>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {skillGroups.map((group, index) => (
                  <Reveal key={group.label} delay={index * 0.04}>
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-amber/70">{group.label}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="border border-ink/15 px-2.5 py-1 text-[11px] text-ink/55 transition-colors duration-300 hover:border-ink/35 hover:text-ink/90"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal>
              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink/12 pt-5">
                <p className="max-w-[42ch] text-[12.5px] leading-relaxed text-ink/55">
                  如果你在找一个既懂模型、又懂内容，还能把它部署到同事电脑上的人，
                  我们大概应该聊聊。
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-center gap-3 text-[12px] text-ink/70 transition-colors hover:text-ink"
                >
                  发一封邮件
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 transition-colors duration-500 group-hover:border-amber group-hover:text-amber">
                    <ArrowUpRight size={14} strokeWidth={1.4} />
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
