import { BRAND } from '../data/content'

// ============================================================
// Footer: minimal, tiga kolom. Tidak ada ikon sosial berlebihan
// atau logo besar — hanya informasi inti.
// ============================================================
export default function Footer() {
  return (
    <footer className="bg-wood-900 text-cream-50/70">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <span className="font-serif text-lg text-cream-50">{BRAND}</span>
            <p className="mt-2 max-w-xs text-sm leading-relaxed">
              Rumah kayu kontemporer yang dibangun dengan bahan lokal dan teliti.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <p className="font-sans text-sm font-medium text-cream-50/90">Jelajah</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#features" className="hover:text-olive-600">Fitur</a></li>
              <li><a href="#tour" className="hover:text-olive-600">Tur interior</a></li>
              <li><a href="#kontak" className="hover:text-olive-600">Kontak</a></li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <p className="font-sans text-sm font-medium text-cream-50/90">Hubungi</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="mailto:halo@redesigninterior.id" className="hover:text-olive-600">halo@redesigninterior.id</a></li>
              <li><span>+62 812 3456 7890</span></li>
              <li><span>Jl. Pinus 12, Bandung</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-cream-50/10 pt-6 text-xs text-cream-50/50">
          <span>© {new Date().getFullYear()} {BRAND}</span>
          <span>Dibuat dengan kayu, batu, dan kode.</span>
        </div>
      </div>
    </footer>
  )
}