// Direktori guru & tenaga kependidikan -- data contoh/placeholder, ganti
// dengan data asli begitu tersedia (foto ditaruh di public/images/teachers/).
export interface Teacher {
  id: string;
  name: string;
  position: string;
  subject?: string;
  photo?: string; // path relatif ke public/images/teachers/, kosongkan kalau belum ada foto
}

export const teachers: Teacher[] = [
  { id: 'kepala-sekolah', name: '[Nama Kepala Sekolah]', position: 'Kepala Sekolah' },
  { id: 'wakil-kurikulum', name: '[Nama Guru]', position: 'Wakil Kepala Sekolah Bidang Kurikulum' },
  { id: 'guru-matematika', name: '[Nama Guru]', position: 'Guru', subject: 'Matematika' },
  { id: 'guru-ipa', name: '[Nama Guru]', position: 'Guru', subject: 'IPA' },
  { id: 'guru-bahasa-indonesia', name: '[Nama Guru]', position: 'Guru', subject: 'Bahasa Indonesia' },
  { id: 'guru-bk', name: '[Nama Guru]', position: 'Guru Bimbingan Konseling' },
];
