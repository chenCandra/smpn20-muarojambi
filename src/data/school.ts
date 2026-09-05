// Data identitas sekolah -- SEMUA nilai yang belum diketahui pasti SENGAJA
// diisi placeholder "[...]" (bukan dikarang), sesuai instruksi: jangan
// pernah menulis data resmi sekolah yang belum benar-benar dikonfirmasi.
// Ganti nilainya di sini begitu data aslinya ada -- semua komponen yang
// menampilkan info sekolah otomatis ikut update.

export const school = {
  name: 'SMPN 20 Muaro Jambi',
  fullName: 'SMP Negeri 20 Muaro Jambi',
  shortCode: 'SMPN 20',
  tagline: 'Explore • Learn • Grow',
  principalName: '[Nama Kepala Sekolah]',
  address: '[Alamat Sekolah]',
  city: 'Muaro Jambi',
  province: 'Jambi',
  phone: '[Nomor Telepon]',
  email: '[Email Sekolah]',
  website: 'https://smpn20muarojambi.sch.id',
  npsn: '[NPSN]',
  social: {
    instagram: '',
    facebook: '',
    youtube: '',
    tiktok: '',
  },
} as const;

// Statistik sekolah (kartu angka di beranda) pindah ke Cloudflare D1,
// diedit lewat /admin/stats -- lihat src/lib/stats.ts.
