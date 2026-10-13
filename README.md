# Re Design Interior

Situs profil rumah kayu kontemporer dengan tur visual berbasis scroll. Pengguna menggulir halaman untuk memutar animasi frame-by-frame, mulai dari eksterior rumah hingga menjelajahi setiap ruang interiornya.

## Fitur

- **Tur scroll animasi** — dua sequence animasi (`seq1` eksterior, `seq2` interior) yang dikendalikan oleh posisi scroll, digambar pada `<canvas>` dengan teknik *cover-fit*.
- **Smooth scrolling** — pergerakan halaman halus memakai [Lenis](https://github.com/darkroomengineering/lenis) yang disinkronkan dengan GSAP ScrollTrigger.
- **Overlay teks sinkron** — judul dan deskripsi muncul dan menghilang mengikuti progres tiap sequence.
- **Preload bertahap** — frame pertama ditampilkan segera, sisanya dimuat di latar belakang; layout kedua dimuat hanya saat pengguna mendekat (lazy).
- **Loader persentase** — indikator progres sampai aset sequence pertama selesai dimuat.
- **Responsif** — panjang scroll dan behavior berbeda untuk desktop (400%) dan mobile (300%).
- **Menghormati `prefers-reduced-motion`** — pengguna dengan preferensi gerak minim mendapat satu frame statis tanpa animasi.
- **Konten terpusat** — semua teks, jumlah frame, dan pengaturan scroll diatur di `src/data/content.js`.

## Teknologi

| Kategori   | Teknologi                                   |
| ---------- | ------------------------------------------- |
| Framework  | React 19                                    |
| Build tool | Vite 8                                      |
| Animasi    | GSAP + ScrollTrigger, Lenis                 |
| Styling    | Tailwind CSS v4                             |
| Ikon       | lucide-react                                |
| Tipografi  | Fraunces Variable, Hanken Grotesk Variable  |
| Linting    | Oxlint                                      |

## Struktur Proyek

```
rumah-scroll/
├─ public/
│  └─ frames/
│     ├─ seq1/          # 160 frame eksterior (ezgif-frame-001.jpg …)
│     └─ seq2/          # 160 frame interior
├─ src/
│  ├─ components/
│  │  ├─ Navbar.jsx         # Navigasi atas, transparan lalu solid saat scroll
│  │  ├─ Loader.jsx         # Layar loading dengan persentase
│  │  ├─ ScrollSequence.jsx # Inti animasi canvas dikendalikan scroll
│  │  ├─ Features.jsx       # Tiga kartu fitur
│  │  ├─ Cta.jsx            # Ajakan kontak
│  │  └─ Footer.jsx         # Footer tiga kolom
│  ├─ data/
│  │  └─ content.js         # Semua konten & konfigurasi (single source of truth)
│  ├─ utils/
│  │  └─ framePath.js       # Helper path nama file frame
│  ├─ App.jsx               # Komposisi halaman & setup Lenis
│  ├─ main.jsx              # Entry point React
│  └─ index.css             # Tailwind, font, dan token desain
├─ index.html
└─ vite.config.js
```

## Menjalankan Secara Lokal

Prasyarat: Node.js 18+ dan npm.

```bash
git clone
git clone https://github.com/bjbghjbv-cpu/FrontendProject.git

# Pasang dependensi
npm install

# Jalankan server pengembangan
npm run dev

# Build untuk produksi
npm run build

# Pratinjau hasil build
npm run preview

# Periksa kode
npm run lint

#menghentikan server
Stop-Process -Name node -Force
```

Server pengembangan berjalan di `http://localhost:5173` secara default.

## Menyesuaikan Konten

Ubah teks, jumlah frame, dan pengaturan scroll hanya di `src/data/content.js` — tidak perlu menyentuh komponen:

- `BRAND` — nama brand yang tampil di navbar, loader, dan footer.
- `FRAME_COUNT` — jumlah frame per sequence.
- `SCROLL_LENGTH_DESKTOP` / `SCROLL_LENGTH_MOBILE` — panjang scroll relatif terhadap viewport.
- `SCRUB_VALUE` — nilai scrub ScrollTrigger (makin kecil makin responsif).
- `SEQUENCE_1` / `SEQUENCE_2` — folder frame, ARIA label, dan teks overlay beserta rentang progresnya.
- `FEATURES` — kartu fitur (ikon, judul, deskripsi).
- `CTA` — judul, deskripsi, label tombol, dan tautan ajakan.

### Menambahkan Frame

Letakkan file JPG di `public/frames/seq1/` atau `public/frames/seq2/` dengan pola nama tiga digit, contoh `ezgif-frame-001.jpg`. Sesuaikan `FRAME_COUNT` di `content.js` agar cocok.

## Palet Desain

Token warna dan tipografi didefinisikan di `src/index.css` (blok `@theme`):

- **Krem** (`cream-50/100/200`) — latar dasar hangat.
- **Kayu** (`wood-500/700/900`) — identitas utama cokelat.
- **Zaitun** (`olive-600/700`) — aksen sekunder.

## Lisensi

Proyek privat. Seluruh hak cipta dilindungi.
