import { ArrowUpRight, Download } from 'lucide-react'
import { Reveal } from './Reveal'
import { DotsMark } from './DotsMark'
import { contact, education, experience, skillGroups, socials } from '../data/content'

const base = import.meta.env.BASE_URL

export function About() {
  return (
    <section id="about" className="relative bg-[#e8e3d6] py-20 text-ink sm:py-24 lg:py-28">
      <div className="container-x">
        <div className="flex items-center border-b border-ink/15 pb-4">
          <span className="eyebrow flex items-center gap-2 text-amber">
            <span className="h-1 w-1 rounded-full bg-amber" />
            关于
          </span>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[350px_1fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
            <Reveal>
              <figure className="group relative max-w-[200px]">
                <div className="relative overflow-hidden bg-ink2 ring-1 ring-ink/15">
                  <img
                    src={`${base}media/img/portrait.jpg`}
                    alt="周连旭肖像"
                    className="aspect-square w-full object-cover object-top grayscale transition-all duration-[1.2s] ease-soft group-hover:grayscale-0"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
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
                AI 影像 / 工作流 / 部署
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-ink/45">
                临沂 → 杭州 · 本科 · 可入职
              </p>
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
                  现在，我把这些能力收进 5 个项目：从一套可玩的互动影游工作台，到一套能独立部署的短剧工作台。
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  更早之前，我写网文、做电子音乐、运营 B 站和小红书。文字教我节奏，
                  音乐教我情绪，短视频教我如何在三秒内留住一个人。现在，我把它们放进同一套工作流。
                  影游工坊、Dara Studio、量产矩阵、内容工厂，都是同一个问题的不同答案：怎样让一段内容稳定地被做出来。
                </p>
              </Reveal>
            </div>

            <div className="mt-12">
              <div className="border-b border-ink/15 pb-3">
                <h3 className="eyebrow text-ink/50">经历</h3>
              </div>

              <div className="mt-6 flex flex-col">
                {experience.map((job, index) => (
                  <Reveal key={job.company} delay={index * 0.04}>
                    <article className="group grid grid-cols-1 gap-3 border-b border-ink/12 py-6 sm:grid-cols-[130px_1fr] sm:gap-6">
                      <div className="flex sm:flex-col sm:gap-2">
                        <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink/40">
                          {job.period}
                        </span>
                      </div>
                      <div>
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h4 className="display text-xl leading-none text-ink sm:text-2xl">{job.company}</h4>
                          <span className="text-[12px] text-ink/55">{job.role}</span>
                        </div>
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
              <div className="border-b border-ink/15 pb-3">
                <h3 className="eyebrow text-ink/50">技能</h3>
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
                  找一个既懂模型、又懂内容，还能把它部署到同事电脑上的人？聊聊。
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
