import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TreePine, Sun, Hammer } from 'lucide-react'
import { FEATURES } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

// Peta nama ikon ke komponen agar bisa didefinisikan di content.js
const ICONS = { TreePine, Sun, Hammer }

// ============================================================
// Features: bagian jeda dengan tiga kartu. Tidak memakai
// penomoran 01/02/03 — judul yang berbicara. Muncul saat
// masuk viewport dengan animasi sederhana.
// ============================================================
export default function Features() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 70%',
        },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="features"
      ref={rootRef}
      className="relative bg-cream-100 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Judul bagian */}
        <div className="mb-14 max-w-2xl">
          <p className="font-sans text-sm uppercase tracking-wider text-olive-700">
            Apa yang membuatnya berbeda
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-wood-900 md:text-4xl">
            Tiga hal yang tidak bisa dijelaskan foto
          </h2>
        </div>

        {/* Kartu fitur */}
        <div className="grid gap-8 md:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = ICONS[f.icon] || TreePine
            return (
              <div
                key={f.title}
                className="feature-card flex flex-col rounded-lg border border-wood-500/15 bg-cream-50 p-7"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-olive-600/10 text-olive-700">
                  <Icon size={22} strokeWidth={1.6} />
                </div>
                <h3 className="font-serif text-xl text-wood-900">{f.title}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-wood-700">
                  {f.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
