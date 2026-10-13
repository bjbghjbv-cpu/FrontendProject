import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import ScrollSequence from './components/ScrollSequence'
import Features from './components/Features'
import Cta from './components/Cta'
import Footer from './components/Footer'
import {
  SEQUENCE_1,
  SEQUENCE_2,
  SCROLL_LENGTH_DESKTOP,
  SCRUB_VALUE,
} from './data/content'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loadProgress, setLoadProgress] = useState(0)
  const [loaderDone, setLoaderDone] = useState(false)
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      clearTimeout(refreshTimer)
    }
  }, [])

  const handleProgress = (p) => {
    setLoadProgress(p)
    if (p >= 1 && !loaderDone) {
      setTimeout(() => setLoaderDone(true), 200)
    }
  }

  return (
    <div id="top">
      <Loader progress={loadProgress} done={loaderDone} />
      <Navbar />

      <main>
        <ScrollSequence
          folder={SEQUENCE_1.folder}
          frameCount={SEQUENCE_1.frameCount}
          overlays={SEQUENCE_1.overlays}
          ariaLabel={SEQUENCE_1.ariaLabel}
          scrollLength={SCROLL_LENGTH_DESKTOP}
          scrub={SCRUB_VALUE}
          priority={true}
          onProgress={handleProgress}
        />

        <Features />

        <div id="tour">
          <ScrollSequence
            folder={SEQUENCE_2.folder}
            frameCount={SEQUENCE_2.frameCount}
            overlays={SEQUENCE_2.overlays}
            ariaLabel={SEQUENCE_2.ariaLabel}
            scrollLength={SCROLL_LENGTH_DESKTOP}
            scrub={SCRUB_VALUE}
            priority={false}
          />
        </div>

        <Cta />
      </main>

      <Footer />
    </div>
  )
}
