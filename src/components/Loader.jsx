import { useEffect, useRef, useState } from 'react'
import { BRAND } from '../data/content'

// ============================================================
// Loader: menampilkan persentase sampai seluruh frame animasi
// pertama (seq1) termuat. Lalu menghilang.
// ============================================================
export default function Loader({ progress = 0, done = false }) {
  const rootRef = useRef(null)
  const [hidden, setHidden] = useState(false)

  // Setelah selesai, tunggu transisi CSS lalu unmount
  useEffect(() => {
    if (!done) return
    const t = setTimeout(() => setHidden(true), 700)
    return () => clearTimeout(t)
  }, [done])

  if (hidden) return null

  const pct = Math.round(progress * 100)

  return (
    <div
      ref={rootRef}
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-wood-900 transition-opacity duration-700 ${done ? 'opacity-0' : 'opacity-100'}`}
      aria-hidden={done}
      aria-label="Memuat aset halaman"
    >
      <span className="font-serif text-cream-50 text-2xl tracking-tight">
        {BRAND}
      </span>

      <div className="mt-6 h-px w-48 overflow-hidden bg-cream-50/20">
        <div
          className="h-full bg-olive-600 transition-[width] duration-150 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <span className="mt-3 font-sans text-xs tabular-nums text-cream-50/70">
        {pct}%
      </span>
    </div>
  )
}