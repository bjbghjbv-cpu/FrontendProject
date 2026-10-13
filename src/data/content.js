// ============================================================


// KONFIGURASI KONTEN — ubah teks, jumlah frame, dan panjang
// scroll di file ini saja. Tidak perlu menyentuh komponen.
// ============================================================

// Nama proyek / brand
export const BRAND = 'Re Design Interior'

// Jumlah frame per sequence (151 -> indeks 0..150)
export const FRAME_COUNT = 160

// Panjang scroll animasi relatif terhadap tinggi viewport.
// Desktop 400%, mobile 300% (lebih pendek agar nyaman di sentuh).
export const SCROLL_LENGTH_DESKTOP = '400%'
export const SCROLL_LENGTH_MOBILE = '300%'

// Nilai scrub ScrollTrigger — makin kecil makin responsif.
export const SCRUB_VALUE = 0.5

// ============================================================
// ANIMASI PERTAMA (seq1) — Hero, bagian paling atas
// ============================================================
export const SEQUENCE_1 = {
  folder: 'seq1',          // folder di public/frames/
  frameCount: FRAME_COUNT,
  ariaLabel: 'Animasi eksterior rumah yang berputar mengikuti gulir',
  // Tiga teks overlay: muncul-menghilang pada rentang progres
  overlays: [
    {
      range: [0.0, 0.25],
      title: 'Sebuah rumah yang bernapas',
      body: 'Dibangun dengan kayu lokal dan cahaya alami yang mengalir sepanjang hari.',
    },
    {
      range: [0.35, 0.6],
      title: 'Luas bangunan 320 m²',
      body: 'Tiga kamar tidur, dua kamar mandi, dan satu ruang kerja menghadap taman.',
    },
    {
      range: [0.7, 0.95],
      title: 'Berdiri di tepi kota',
      body: 'Sepuluh menit dari pusat, tetap dikelilingi pohon dan suara burung.',
    },
  ],
}

// ============================================================
// ANIMASI KEDUA (seq2) — Muncul setelah bagian jeda/fitur
// ============================================================
export const SEQUENCE_2 = {
  folder: 'seq2',
  frameCount: FRAME_COUNT,
  ariaLabel: 'Animasi interior rumah yang berputar mengikuti gulir',
  overlays: [
    {
      range: [0.0, 0.25],
      title: 'Ruang dalam yang lapang',
      body: 'Langit-langit tinggi dua belas kaki menyatu dengan loft kayu.',
    },
    {
      range: [0.35, 0.6],
      title: 'Dapur pulau batu',
      body: 'Counter granit penuh, kompor lima tungku, dan lemari es yang tersembunyi.',
    },
    {
      range: [0.7, 0.95],
      title: 'Kamar utama menghadap barat',
      body: 'Cahaya sore masuk lewat jendela langit, hangat hingga senja.',
    },
  ],
}

// ============================================================
// KARTU FITUR (bagian jeda antara dua animasi)
// Hindari penomoran 01/02/03 — biarkan judul yang berbicara.
// ============================================================
export const FEATURES = [
  {
    icon: 'TreePine',
    title: 'Berbatasan dengan taman',
    body: 'Pintu belakang langsung membuka ke jalur pejalan kaki berpayung pohon.',
  },
  {
    icon: 'Sun',
    title: 'Orientasi pasif',
    body: 'Jendela selatan besar menangkap matahari musim dingin, menolak musim panas.',
  },
  {
    icon: 'Hammer',
    title: 'Bahan yang jujur',
    body: 'Kayu jati solid, batu alam, dan plester kapur — tidak ada tiruan.',
  },
]

// ============================================================
// AJAKAN KONTAK
// ============================================================
export const CTA = {
  title: 'Pindahkan hidup Anda ke Re Design Interior',
  body: 'Jadwalkan kunjungan pribadi untuk merasakan ruangnya secara langsung.',
  buttonLabel: 'Jadwalkan kunjungan',
  href: 'mailto:halo@redesigninterior.id',
}