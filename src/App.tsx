import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, useReducedMotion } from 'motion/react'
import Lenis from 'lenis'
import { Loader } from './components/Loader'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Statement } from './components/Statement'
import { ReelBand } from './components/ReelBand'
import { Works, projectToItem, type LightboxItem } from './components/Works'
import { Numbers } from './components/Numbers'
import { Pipeline } from './components/Pipeline'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Lightbox } from './components/Lightbox'
import { Cursor } from './components/Cursor'
import { Grain } from './components/Grain'
import { ScrollProgress, SectionRail } from './components/SectionRail'
import { projects } from './data/content'
import { registerLenis } from './lib/scroll'

const base = import.meta.env.BASE_URL

const reelItem: LightboxItem = {
  index: '00',
  title: '作品集',
  en: 'SHOWREEL 2024—2026',
  client: '周连旭 / ZHOU LIANXU',
  category: 'SHOWREEL',
  mediaType: 'video',
  src: `${base}media/clips/showreel.mp4`,
  poster: `${base}media/clips/showreel.jpg`,
  ratio: '16:9',
  duration: '25s',
  year: '2026',
  summary: '25 秒，5 个项目。',
  details:
    '25 秒，5 个项目。从影游工坊的结构图、Dara Studio 的工作台、量产矩阵的 10 环节出片、自媒体的 300 万+ 播放，到内容工厂的人味脚本。剪这一段的时候，我才发现它们其实在同一条线上：先把一句话写清楚，再让画面、声音、字幕和落版各就各位。音乐：The Great Sea — Scott Buckley（CC BY 3.0）。',
  metrics: [
    { value: '25s', label: '时长' },
    { value: '05', label: '项目' },
    { value: '01', label: '条主线' },
  ],
  deliverables: ['5 个项目片段', '16:9 / 9:16 混剪', '标题卡 / 落版', 'BGM 混音'],
  tools: ['ffmpeg', 'PIL', 'HyperFrames'],
  role: ['选片', '剪辑', '调色', '混音'],
}

export default function App() {
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)
  const [lightbox, setLightbox] = useState<{ items: LightboxItem[]; startIndex: number; key: number } | null>(null)

  const projectItems = useMemo(() => projects.map(projectToItem), [])

  useEffect(() => {
    if (reduced) setReady(true)
  }, [reduced])

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      smoothWheel: true,
    })
    registerLenis(lenis)
    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      registerLenis(null)
    }
  }, [reduced])

  const finishIntro = useCallback(() => setReady(true), [])

  const openProject = useCallback(
    (item: LightboxItem) => {
      const startIndex = projectItems.findIndex((project) => project.index === item.index)
      setLightbox({ items: projectItems, startIndex: Math.max(0, startIndex), key: Date.now() })
    },
    [projectItems],
  )

  const openReel = useCallback(() => {
    setLightbox({ items: [reelItem], startIndex: 0, key: Date.now() })
  }, [])

  return (
    <>
      <a
        href="#works"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[500] focus:bg-cream focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        跳到作品
      </a>

      <AnimatePresence>{!ready && <Loader key="loader" onDone={finishIntro} />}</AnimatePresence>

      <ScrollProgress />
      <Nav ready={ready} />
      <SectionRail />
      <Cursor />
      <Grain />

      <main>
        <Hero ready={ready} onPlayReel={openReel} />
        <Statement />
        <ReelBand onPlayReel={openReel} />
        <Works onOpen={openProject} />
        <Numbers />
        <Pipeline />
        <About />
        <Contact />
      </main>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            key={lightbox.key}
            items={lightbox.items}
            startIndex={lightbox.startIndex}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
