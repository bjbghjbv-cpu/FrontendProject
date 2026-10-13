import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { framePath } from '../utils/framePath'

gsap.registerPlugin(ScrollTrigger)

// ============================================================
// ScrollSequence — komponen animasi gambar dikendalikan scroll.
// Dipakai untuk seq1 (hero) dan seq2 (tur). Masing-masing
// instance punya canvas, ScrollTrigger, dan preload sendiri.
// ============================================================
export default function ScrollSequence({
  folder,
  frameCount,
  overlays = [],
  ariaLabel = '',
  scrollLength = '400%',
  scrub = 0.5,
  priority = false,      // true: muat segera (seq1); false: muat saat mendekat (seq2)
  onProgress = null,     // callback pelaporan progres preload (untuk Loader)
}) {
  const stageRef = useRef(null)     // elemen pemicu (tinggi = scrollLength)
  const stickyRef = useRef(null)    // elemen yang di-pin (100vh)
  const canvasRef = useRef(null)    // canvas tempat menggambar frame
  const textRefs = useRef([])       // referensi tiga teks overlay
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const images = new Array(frameCount)
    let currentFrame = -1
    let rafId = null
    let lenisRafBound = false

    // --- Fungsi gambar cover-fit ke canvas ---
    const drawCover = (img) => {
      if (!img) return
      const cw = canvas.width
      const ch = canvas.height
      if (!cw || !ch) return
      const iw = img.naturalWidth
      const ih = img.naturalHeight
      const imgAspect = iw / ih
      const canvasAspect = cw / ch
      let sx, sy, sw, sh
      if (imgAspect > canvasAspect) {
        // Gambar lebih lebar — crop samping
        sh = ih
        sw = ih * canvasAspect
        sx = (iw - sw) / 2
        sy = 0
      } else {
        // Gambar lebih tinggi — crop atas-bawah
        sw = iw
        sh = iw / canvasAspect
        sx = 0
        sy = (ih - sh) / 2
      }
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)
    }

    // --- Sesuaikan ukuran canvas dengan devicePixelRatio ---
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      // Gambar ulang frame saat ini setelah resize
      if (images[currentFrame]) drawCover(images[currentFrame])
    }

    // --- Gambar frame hanya bila indeks berubah ---
    const renderFrame = (idx) => {
      const i = Math.max(0, Math.min(frameCount - 1, Math.round(idx)))
      if (i === currentFrame) return
      currentFrame = i
      if (images[i]) drawCover(images[i])
    }

    // --- Preload: frame pertama dulu, lalu sisanya ---
    const loadImage = (i) => new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = () => resolve(null)
      img.src = framePath(folder, i)
    })

    const preload = async () => {
      // Muat frame pertama dan tampilkan segera
      images[0] = await loadImage(0)
      resize()
      renderFrame(0)
      if (onProgress) onProgress(1 / frameCount)

      // Muat sisanya di latar belakang
      for (let i = 1; i < frameCount; i++) {
        images[i] = await loadImage(i)
        if (onProgress) onProgress((i + 1) / frameCount)
      }
      setReady(true)
      // Refresh setelah siap agar posisi bagian bawah akurat
      ScrollTrigger.refresh()
    }

    // --- Mulai preload segera atau saat mendekati bagian ---
    let triggerForLazy = null
    if (priority) {
      preload()
    } else {
      // seq2: muat ketika pengguna mendekati 80vh sebelum bagian
      triggerForLazy = ScrollTrigger.create({
        trigger: stageRef.current,
        start: 'top 80%',
        onEnter: () => { preload(); triggerForLazy && triggerForLazy.kill() },
      })
    }

    // --- Siapkan animasi utama dengan gsap.matchMedia ---
    const mm = gsap.matchMedia()
    const gsapCtx = gsap.context(() => {
      // Variabel ini akan dipakai oleh dua query matchMedia berbeda
      let mainTrigger = null

      mm.add('(prefers-reduced-motion: reduce)', () => {
        // Mode aksesibilitas: hanya tampilkan frame tengah statis
        // tanpa animasi scroll.
        const setStatic = async () => {
          const mid = Math.floor(frameCount / 2)
          if (!images[mid]) images[mid] = await loadImage(mid)
          resize()
          renderFrame(mid)
        }
        setStatic()
        // Tampilkan semua teks overlay secara statis
        textRefs.current.forEach((el) => {
          if (el) gsap.set(el, { opacity: 1, y: 0 })
        })
      })

      mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
        // Desktop: scrollLength penuh
        const frameObj = { frame: 0 }
        mainTrigger = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: 'top top',
            end: `+=${scrollLength}`,
            pin: stickyRef.current,
            scrub,
            anticipatePin: 1,
          },
        })
        .to(frameObj, {
          frame: frameCount - 1,
          snap: 'frame',
          ease: 'none',
          duration: frameCount - 1,
          onUpdate: () => renderFrame(frameObj.frame),
        })

        // Animasi overlay: fade-in, hold, fade-out (tidak saling tumpang)
        overlays.forEach((ov, idx) => {
          const el = textRefs.current[idx]
          if (!el) return
          const [start, end] = ov.range
          const span = end - start
          const fadeInEnd = start + span * 0.2
          const fadeOutStart = start + span * 0.8

          if (idx === 0) {
            gsap.set(el, { opacity: 1, y: 0 })
          } else {
            gsap.fromTo(el, { opacity: 0, y: 24 }, {
              opacity: 1, y: 0, ease: 'power2.out',
              scrollTrigger: {
                trigger: stageRef.current,
                start: `top+=${start * 100}% top`,
                end: `top+=${fadeInEnd * 100}% top`,
                scrub: true,
              },
            })
          }

          gsap.to(el, {
            opacity: 0, y: -24, ease: 'power2.in',
            scrollTrigger: {
              trigger: stageRef.current,
              start: `top+=${fadeOutStart * 100}% top`,
              end: `top+=${end * 100}% top`,
              scrub: true,
            },
          })
        })
      })

      mm.add('(max-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        // Mobile: scrollLength lebih pendek (300%)
        const frameObj = { frame: 0 }
        mainTrigger = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: 'top top',
            end: '+=300%',
            pin: stickyRef.current,
            scrub,
            anticipatePin: 1,
          },
        })
        .to(frameObj, {
          frame: frameCount - 1,
          snap: 'frame',
          ease: 'none',
          duration: frameCount - 1,
          onUpdate: () => renderFrame(frameObj.frame),
        })

        // Animasi overlay: sama dengan desktop
        overlays.forEach((ov, idx) => {
          const el = textRefs.current[idx]
          if (!el) return
          const [start, end] = ov.range
          const span = end - start
          const fadeInEnd = start + span * 0.2
          const fadeOutStart = start + span * 0.8

          if (idx === 0) {
            gsap.set(el, { opacity: 1, y: 0 })
          } else {
            gsap.fromTo(el, { opacity: 0, y: 24 }, {
              opacity: 1, y: 0, ease: 'power2.out',
              scrollTrigger: {
                trigger: stageRef.current,
                start: `top+=${start * 100}% top`,
                end: `top+=${fadeInEnd * 100}% top`,
                scrub: true,
              },
            })
          }

          gsap.to(el, {
            opacity: 0, y: -24, ease: 'power2.in',
            scrollTrigger: {
              trigger: stageRef.current,
              start: `top+=${fadeOutStart * 100}% top`,
              end: `top+=${end * 100}% top`,
              scrub: true,
            },
          })
        })
      })

      return () => {
        if (mainTrigger) mainTrigger.scrollTrigger && mainTrigger.scrollTrigger.kill()
      }
    }, stageRef)

    // --- Resize listener ---
    window.addEventListener('resize', resize)
    resize()

    // --- Cleanup ---
    return () => {
      window.removeEventListener('resize', resize)
      gsapCtx.revert()
      mm.revert()
      if (triggerForLazy) triggerForLazy.kill()
      if (rafId) cancelAnimationFrame(rafId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder, frameCount])

  return (
    <section
      ref={stageRef}
      className="relative"
      aria-label={ariaLabel}
    >
      {/* Kontainer yang di-pin, tinggi 100vh */}
      <div
        ref={stickyRef}
        className="relative h-screen w-full overflow-hidden bg-wood-900"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        />

        {/* Overlay gradien tipis untuk keterbacaan teks */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(46,32,20,0.55) 0%, rgba(46,32,20,0.15) 35%, rgba(46,32,20,0.05) 60%, rgba(46,32,20,0.5) 100%)',
          }}
        />

        {/* Tiga teks overlay */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          {overlays.map((ov, idx) => (
            <div
              key={idx}
              ref={(el) => (textRefs.current[idx] = el)}
              className="absolute max-w-2xl opacity-0"
            >
              <h2 className="font-serif text-3xl leading-tight text-cream-50 md:text-5xl">
                {ov.title}
              </h2>
              <p className="mt-3 font-sans text-sm text-cream-50/85 md:text-base">
                {ov.body}
              </p>
            </div>
          ))}
        </div>

        {/* Indikator halus saat sedang memuat (seq2) */}
        {!ready && !priority && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-cream-50/60">
            Memuat tur…
          </div>
        )}
      </div>
    </section>
  )
}