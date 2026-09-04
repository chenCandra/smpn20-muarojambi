import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// `cover`/`photo` di semua koleksi di bawah SENGAJA string path biasa
// (bukan helper `image()` Astro yang memvalidasi file benar-benar ada) --
// situs ini belum punya foto asli, jadi field-nya boleh diisi belakangan
// tanpa build gagal karena file hilang. Ganti ke `image()` kalau nanti
// mau optimasi gambar otomatis setelah foto aslinya ada.

const berita = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/berita' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    excerpt: z.string().optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Prestasi -- diambil dari pola serupa di proyek LARAS (situs SMAN 4 Muaro
// Jambi): etalase penghargaan/pencapaian sekolah & siswa, dikelompokkan
// per tingkat lomba supaya pembaca langsung lihat levelnya.
const prestasi = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/prestasi' }),
  schema: z.object({
    title: z.string(),
    studentName: z.string().optional(),
    level: z.enum(['Sekolah', 'Kecamatan', 'Kabupaten', 'Provinsi', 'Nasional', 'Internasional']),
    year: z.number().int(),
    pubDate: z.date(),
    excerpt: z.string().optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Agenda -- kalender kegiatan sekolah, TIDAK ada draft (semua agenda yang
// ditulis otomatis tampil, beda dari berita/prestasi/pengumuman yang bisa
// disiapkan dulu sebelum publish).
const agenda = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/agenda' }),
  schema: z.object({
    title: z.string(),
    eventDate: z.date(),
    endDate: z.date().optional(),
    location: z.string().optional(),
  }),
});

// Pengumuman -- beda dari Berita: biasanya berlaku sampai tanggal
// tertentu (validUntil, opsional) & bisa disematkan di atas daftar
// (pinned) -- pola sama seperti modul Pengumuman di LARAS.
const pengumuman = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pengumuman' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    validUntil: z.date().optional(),
    pinned: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Guru & Tenaga Kependidikan -- data terstruktur (bukan artikel panjang),
// jadi satu file JSON berisi array, bukan satu file Markdown per orang --
// lebih gampang diedit/dilihat sekaligus buat daftar staf yang bisa puluhan.
const guru = defineCollection({
  loader: file('./src/content/guru.json'),
  schema: z.object({
    name: z.string(),
    position: z.string(),
    subject: z.string().optional(),
    photo: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { berita, prestasi, agenda, pengumuman, guru };
