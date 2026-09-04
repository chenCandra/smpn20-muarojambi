// Berita sekolah -- data dummy dulu (ditandai jelas di tiap judul), struktur
// dipisah dari komponen tampilan (NewsCard, halaman /berita) supaya nanti
// gampang diganti sumbernya (CMS, API, dst) tanpa ubah UI.
export type NewsCategory = 'Prestasi' | 'Akademik' | 'Kegiatan' | 'Pengumuman' | 'Sekolah';

export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string[]; // array paragraf -- render apa adanya, tanpa dependency markdown parser
  category: NewsCategory;
  date: string; // ISO yyyy-mm-dd
  cover?: string; // path relatif ke public/images/news/, kosongkan kalau belum ada foto
}

export const news: NewsArticle[] = [
  {
    slug: 'contoh-juara-cerdas-cermat',
    title: '[Contoh] Tim Cerdas Cermat Raih Juara 1 Tingkat Kabupaten',
    excerpt: 'Tim cerdas cermat SMPN 20 Muaro Jambi berhasil meraih juara 1 pada ajang tingkat kabupaten.',
    content: [
      'Ini adalah data contoh/placeholder -- ganti dengan berita asli di src/data/news.ts.',
      'Siswa-siswi SMPN 20 Muaro Jambi berhasil meraih Juara 1 dalam Lomba Cerdas Cermat tingkat Kabupaten Muaro Jambi, hasil kerja keras dan bimbingan guru pembina.',
    ],
    category: 'Prestasi',
    date: '2026-08-15',
  },
  {
    slug: 'contoh-penerimaan-rapor',
    title: '[Contoh] Jadwal Penerimaan Rapor Semester Ganjil',
    excerpt: 'Informasi jadwal pembagian rapor semester ganjil tahun ajaran berjalan.',
    content: [
      'Ini adalah data contoh/placeholder -- ganti dengan berita asli di src/data/news.ts.',
      'Orang tua/wali murid diharapkan hadir sesuai jadwal yang telah ditentukan untuk pengambilan rapor semester ganjil.',
    ],
    category: 'Akademik',
    date: '2026-12-10',
  },
  {
    slug: 'contoh-classmeeting',
    title: '[Contoh] Serunya Class Meeting Akhir Semester',
    excerpt: 'Rangkaian lomba olahraga dan seni mewarnai class meeting akhir semester tahun ini.',
    content: [
      'Ini adalah data contoh/placeholder -- ganti dengan berita asli di src/data/news.ts.',
      'Kegiatan class meeting diselenggarakan setelah Penilaian Akhir Semester, diisi dengan berbagai lomba antar kelas.',
    ],
    category: 'Kegiatan',
    date: '2026-12-18',
  },
  {
    slug: 'contoh-libur-semester',
    title: '[Contoh] Pengumuman Libur Akhir Semester Ganjil',
    excerpt: 'Jadwal libur akhir semester ganjil dan hari pertama masuk sekolah semester genap.',
    content: [
      'Ini adalah data contoh/placeholder -- ganti dengan berita asli di src/data/news.ts.',
      'Libur akhir semester ganjil dimulai tanggal 20 Desember dan kegiatan belajar mengajar kembali dimulai 5 Januari.',
    ],
    category: 'Pengumuman',
    date: '2026-12-05',
  },
  {
    slug: 'contoh-website-baru',
    title: '[Contoh] Selamat Datang di Situs Baru SMPN 20 Muaro Jambi',
    excerpt: 'Situs resmi sekolah kini hadir dengan tampilan baru yang lebih segar.',
    content: [
      'Ini adalah data contoh/placeholder -- ganti dengan berita asli di src/data/news.ts.',
      'Melalui situs ini, siswa, orang tua, dan masyarakat dapat mengakses informasi terbaru seputar sekolah dengan lebih mudah.',
    ],
    category: 'Sekolah',
    date: '2026-09-04',
  },
];
