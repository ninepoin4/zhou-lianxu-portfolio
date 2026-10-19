import { useState } from 'react'
import { ArrowDown, ArrowUpRight, Check, Copy, Mail, MapPin, Phone, Send } from 'lucide-react'
import { contact, socials } from '../data/content'
import { MaskLines, Reveal } from './Reveal'
import { Magnetic } from './Magnetic'
import { Marquee } from './Marquee'
import { DotsMark } from './DotsMark'
import { useClock } from '../lib/useClock'
import { scrollToTop } from '../lib/scroll'

const base = import.meta.env.BASE_URL

function CopyValue({ label, value, href, icon }: { label: string; value: string; href?: string; icon: React.ReactNode }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="group flex items-center justify-between gap-4 border-b border-ink/12 py-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className="text-ink/35">{icon}</span>
        <div className="min-w-0">
          <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink/50">{label}</p>
          {href ? (
            <a href={href} className="link-line mt-1 block truncate text-[13px] text-ink/80 hover:text-ink">
              {value}
            </a>
          ) : (
            <p className="mt-1 truncate text-[13px] text-ink/80">{value}</p>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={copy}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/40 transition-colors hover:border-amber hover:text-amber"
        aria-label={`复制${label}`}
      >
        {copied ? <Check size={12} strokeWidth={1.5} className="text-amber" /> : <Copy size={11} strokeWidth={1.4} />}
      </button>
    </div>
  )
}

export function Contact() {
  const clock = useClock()

  return (
    <section id="contact" className="relative overflow-hidden bg-[#e6dfd0] pt-20 text-ink sm:pt-24 lg:pt-28">
      <div className="pointer-events-none absolute inset-0">
        <img
          src={`${base}media/img/dara-castle.jpg`}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-[0.13]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#e6dfd0] via-[#e6dfd0]/85 to-[#e6dfd0]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_100%,rgba(200,118,60,0.16),transparent_70%)]" />
      </div>

      <div className="container-x relative">
        <div className="flex items-center justify-between border-b border-ink/15 pb-4">
          <span className="eyebrow flex items-center gap-2 text-amber">
            <span className="h-1 w-1 animate-pulse rounded-full bg-amber" />
            06 / CONTACT
          </span>
          <span className="eyebrow hidden text-ink/40 sm:block">目前可接洽</span>
          <span className="eyebrow text-ink/40">{clock} · GMT+8</span>
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <MaskLines
              className="display text-[clamp(2.4rem,6.2vw,6rem)] leading-[1.06] text-ink"
              delay={0.05}
              lines={[
                <span key="1">下一部片子，</span>,
                <span key="2">
                  从一条消息<span className="text-amber">开始</span>。
                </span>,
              ]}
            />

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[44ch] text-[13px] leading-[1.95] text-ink/60 sm:text-[13.5px]">
                正在寻找 AI 产品 / AI 工作流 / AI 部署 方向的岗位。杭州，一周内到岗。
                也欢迎直接丢一个难做的题目过来。
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-10 flex flex-col gap-5">
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex w-fit max-w-full items-center gap-3 sm:gap-5"
                  data-cursor-label="写信"
                >
                  <Mail size={20} strokeWidth={1.1} className="shrink-0 text-amber" />
                  <span className="serif-en break-all text-[clamp(1.5rem,3.4vw,2.7rem)] leading-none tracking-tight text-ink transition-colors duration-500 group-hover:text-amber">
                    {contact.email}
                  </span>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.2}
                    className="shrink-0 text-ink/40 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-amber"
                  />
                </a>

                <div className="flex flex-wrap items-center gap-4">
                  <Magnetic strength={0.18}>
                    <a
                      href={`mailto:${contact.email}?subject=你好，周连旭`}
                      className="group flex items-center gap-3 bg-ink px-5 py-3.5 text-[13px] text-cream transition-colors duration-500 hover:bg-amber hover:text-ink"
                    >
                      <Send size={13} strokeWidth={1.5} />
                      写一封邮件
                    </a>
                  </Magnetic>
                  <a
                    href={`${base}resume/zhou-lianxu-resume.pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 border border-ink/25 px-5 py-3.5 text-[13px] text-ink/75 transition-colors duration-500 hover:border-ink/50 hover:text-ink"
                  >
                    下载简历
                    <ArrowDown size={13} strokeWidth={1.4} className="text-ink/40 transition-colors group-hover:text-amber" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col justify-between gap-8">
            <Reveal delay={0.1}>
              <div>
                <p className="eyebrow mb-2 text-ink/40">DIRECT / 直接联系</p>
                <CopyValue label="微信 WeChat" value={contact.wechat} icon={<span className="font-mono text-[11px]">W</span>} />
                <CopyValue
                  label="电话 Phone"
                  value={contact.phone}
                  href={`tel:${contact.phoneRaw}`}
                  icon={<Phone size={13} strokeWidth={1.3} />}
                />
                <CopyValue
                  label="邮箱 Email"
                  value={contact.email}
                  href={`mailto:${contact.email}`}
                  icon={<Mail size={13} strokeWidth={1.3} />}
                />
                <div className="flex items-center justify-between gap-4 border-b border-ink/12 py-4">
                  <div className="flex items-center gap-3">
                    <MapPin size={13} strokeWidth={1.3} className="text-ink/35" />
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink/50">城市 City</p>
                      <p className="mt-1 text-[13px] text-ink/80">临沂 → 杭州 · 一周内到岗</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-amber/80">
                    <span className="h-1 w-1 rounded-full bg-amber" />
                    OPEN
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="border border-ink/15 bg-paper/55 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink/40">ELSEWHERE</p>
                  <span className="font-mono text-[8px] text-ink/30">2026</span>
                </div>
                <a
                  href={contact.siteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-3 flex items-center justify-between border-b border-ink/12 pb-3"
                >
                  <span className="flex items-baseline gap-2">
                    <span className="text-[12.5px] text-ink/70 transition-colors group-hover:text-ink">在线主页</span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink/40">GitHub Pages</span>
                  </span>
                  <ArrowUpRight size={13} strokeWidth={1.4} className="text-ink/30 transition-colors group-hover:text-amber" />
                </a>
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-3 flex items-center justify-between border-b border-ink/12 pb-3"
                >
                  <span className="flex items-baseline gap-2">
                    <span className="text-[12.5px] text-ink/70 transition-colors group-hover:text-ink">源码</span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink/40">GitHub</span>
                  </span>
                  <ArrowUpRight size={13} strokeWidth={1.4} className="text-ink/30 transition-colors group-hover:text-amber" />
                </a>
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-3 flex items-center justify-between border-b border-ink/12 pb-3"
                  >
                    <span className="flex items-baseline gap-2">
                      <span className="text-[12.5px] text-ink/70 transition-colors group-hover:text-ink">{social.label}</span>
                      <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink/40">{social.note}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-ink/45">{social.stat}</span>
                      <ArrowUpRight size={12} strokeWidth={1.4} className="text-ink/30 transition-colors group-hover:text-amber" />
                    </span>
                  </a>
                ))}
                <p className="mt-4 text-[11.5px] leading-relaxed text-ink/50">
                  本站视频素材来自近一年真实项目，部分原始文件过大，做了压缩与截取。片头音乐：The Great Sea — Scott Buckley（CC BY 3.0）。
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="relative mt-20 border-y border-ink/15 py-5">
        <Marquee speed={30}>
          {[0, 1, 2].map((index) => (
            <span key={index} className="flex items-center">
              <span className="serif-en whitespace-nowrap px-6 text-[clamp(2.4rem,7vw,6.4rem)] uppercase italic leading-none text-ink/80">
                Let&apos;s make something that ships
              </span>
              <span className="text-[clamp(1.2rem,2.5vw,2rem)] text-amber">✳</span>
            </span>
          ))}
        </Marquee>
      </div>

      <footer className="relative">
        <div className="container-x flex flex-col gap-4 border-t border-ink/15 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <DotsMark size={16} />
            <div className="flex flex-col leading-none">
              <span className="display text-sm text-ink/85">周连旭 / ZHOU LIANXU</span>
              <span className="mt-1 font-mono text-[7.5px] uppercase tracking-[0.2em] text-ink/35">
                © 2026 周连旭 · ALL RIGHTS RESERVED
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/40">
            <span>REACT · TYPESCRIPT · MOTION</span>
            <span className="hidden h-3 w-px bg-ink/15 sm:block" />
            <span>用一点偏执，手工搭建</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="group flex items-center gap-1.5 text-ink/45 transition-colors hover:text-ink"
            >
              回到顶部
              <ArrowDown size={11} strokeWidth={1.4} className="rotate-180 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </footer>
    </section>
  )
}
