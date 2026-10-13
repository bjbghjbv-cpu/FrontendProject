// ============================================================
// Helper: hasilkan path frame dari nomor (angka nol di depan,
// tiga digit). Contoh: framePath('seq1', 1) -> '/frames/seq1/ezgif-frame-001.jpg'
// ============================================================

export function framePath(folder, index) {
  const padded = String(index + 1).padStart(3, '0')
  return `/frames/${folder}/ezgif-frame-${padded}.jpg`
}

// Versi alternatif bila nama file berbeda — tidak dipakai, hanya cadangan.
export function buildFrameList(folder, count) {
  return Array.from({ length: count }, (_, i) => framePath(folder, i))
}