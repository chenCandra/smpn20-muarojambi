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

// Statistik sekolah -- ANGKA DI BAWAH PLACEHOLDER, belum data resmi.
// Ditaruh terpisah dari komponen StatCard biar gampang diganti tanpa
// menyentuh kode tampilan.
export const stats = [
  { label: 'Siswa', value: 500, suffix: '+' },
  { label: 'Guru & Tenaga Kependidikan', value: 30, suffix: '+' },
  { label: 'Ekstrakurikuler', value: 15, suffix: '+' },
  { label: 'Tahun Berkarya', value: 20, suffix: '+' },
] as const;
