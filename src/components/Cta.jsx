import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { CTA } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

// ============================================================
// Cta: bagian ajakan kontak sebelum footer. Tombol mengarah
// ke link di content.js (mailto). Animasi muncul saat masuk
// viewport.
// ============================================================
export default function Cta() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-inner > *', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 75%',
        },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="kontak"
      ref={rootRef}
      className="relative bg-wood-900 py-24 md:py-32"
    >
      <div className="cta-inner mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-serif text-3xl leading-tight text-cream-50 md:text-5xl">
          {CTA.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl font-sans text-base text-cream-50/80">
          {CTA.body}
        </p>
        <a
          href={CTA.href}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-olive-600 px-7 py-3 font-sans text-sm text-cream-50 transition-colors hover:bg-olive-700"
        >
          {CTA.buttonLabel}
          <ArrowRight size={18} strokeWidth={1.6} />
        </a>
      </div>
    </section>
  )
}