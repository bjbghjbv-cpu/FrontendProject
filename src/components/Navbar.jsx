import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { BRAND } from '../data/content'

// ============================================================
// Navbar: tetap di atas, latar transparan, berubah ketika
// halaman digulir. Tautan menggulir ke bagian terkait.
// ============================================================
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Toggle kelas 'scrolled' berdasar posisi gulir
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Fitur', href: '#features' },
    { label: 'Tur', href: '#tour' },
    { label: 'Kontak', href: '#kontak' },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-300 ${
        scrolled
          ? 'bg-cream-50/85 backdrop-blur-md shadow-[0_1px_0_rgba(46,32,20,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <a
          href="#top"
          className={`font-serif text-lg tracking-tight transition-colors ${
            scrolled ? 'text-wood-900' : 'text-cream-50'
          }`}
          onClick={() => setOpen(false)}
        >
          {BRAND}
        </a>

        {/* Link desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors hover:text-olive-600 ${
                scrolled ? 'text-wood-700' : 'text-cream-50/90'
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontak"
            className="rounded-full bg-olive-600 px-5 py-2 text-sm text-cream-50 transition-colors hover:bg-olive-700"
          >
            Jadwalkan kunjungan
          </a>
        </div>

        {/* Tombol menu mobile */}
        <button
          className="md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={open}
        >
          {open ? (
            <X className={scrolled ? 'text-wood-900' : 'text-cream-50'} size={24} />
          ) : (
            <Menu className={scrolled ? 'text-wood-900' : 'text-cream-50'} size={24} />
          )}
        </button>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden bg-cream-50/95 backdrop-blur-md">
          <div className="flex flex-col gap-2 px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="py-2 text-wood-700"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}