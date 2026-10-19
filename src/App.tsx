import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, useReducedMotion } from 'motion/react'
import Lenis from 'lenis'
import { Loader } from './components/Loader'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Statement } from './components/Statement'
import { ReelBand } from './components/ReelBand'
import { Works, filmToItem, type LightboxItem } from './components/Works'
import { Numbers } from './components/Numbers'
import { Pipeline } from './components/Pipeline'
import { Systems } from './components/Systems'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Lightbox } from './components/Lightbox'
import { Cursor } from './components/Cursor'
import { Grain } from './components/Grain'
import { ScrollProgress, SectionRail } from './components/SectionRail'
import { films } from './data/content'
import { registerLenis } from './lib/scroll'

const base = import.meta.env.BASE_URL

const reelItem: LightboxItem = {
  id: 'showreel',
  title: '作品集',
  en: 'SHOWREEL 2024—2026',
  client: '周连旭 / ZHOU LIANXU',
  src: `${base}media/clips/showreel.mp4`,
  poster: `${base}media/clips/showreel.jpg`,
  ratio: '16:9',
  desc: '25 秒，8 个项目。从戴拉的烛光舞会，到普陀的香火、一颗珍珠的旋转、雨夜的便利店。剪这一段的时候，我才发现它们其实在同一条线上。音乐：The Great Sea — Scott Buckley（CC BY 3.0）。',
  tools: ['ffmpeg', 'HyperFrames', 'Wan 3.0'],
  role: ['选片', '剪辑', '调色', '混音'],
  duration: '26s',
  year: '2026',
}

export default function App() {
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)
  const [lightbox, setLightbox] = useState<{ items: LightboxItem[]; startIndex: number; key: number } | null>(null)

  const filmItems = useMemo(() => films.map(filmToItem), [])

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

  const openFilm = useCallback(
    (index: number) => {
      if (index < 0) return
      setLightbox({ items: filmItems, startIndex: index, key: Date.now() })
    },
    [filmItems],
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
        <Works onOpen={openFilm} />
        <Numbers />
        <Pipeline />
        <Systems />
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
