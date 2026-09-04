// Galeri foto -- `size` menentukan proporsi kartu di layout masonry
// (lihat GalleryGrid.astro). Foto asli belum ada, `src` dikosongkan biar
// komponen menampilkan placeholder yang jelas alih-alih gambar rusak.
export interface GalleryPhoto {
  src: string; // path relatif ke public/images/gallery/, kosongkan kalau belum ada foto
  alt: string;
  caption?: string;
  size: 'landscape' | 'portrait' | 'square';
}

export const gallery: GalleryPhoto[] = [
  { src: '', alt: 'Kegiatan upacara bendera', caption: 'Upacara Bendera', size: 'landscape' },
  { src: '', alt: 'Kegiatan belajar di kelas', caption: 'Suasana Kelas', size: 'portrait' },
  { src: '', alt: 'Kegiatan ekstrakurikuler olahraga', caption: 'Ekstrakurikuler Futsal', size: 'square' },
  { src: '', alt: 'Kegiatan class meeting', caption: 'Class Meeting', size: 'portrait' },
  { src: '', alt: 'Kegiatan seni dan budaya', caption: 'Pentas Seni', size: 'landscape' },
  { src: '', alt: 'Kegiatan pramuka', caption: 'Kegiatan Pramuka', size: 'square' },
];
