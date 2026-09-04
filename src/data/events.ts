// Agenda/kalender kegiatan sekolah -- data contoh, format tanggal ISO
// (yyyy-mm-dd) supaya gampang dipakai buat sortir & tampilan "DD MON".
export interface SchoolEvent {
  date: string; // ISO yyyy-mm-dd
  title: string;
  location?: string;
  description?: string;
}

export const events: SchoolEvent[] = [
  {
    date: '2026-09-04',
    title: 'Upacara Bendera',
    location: 'Lapangan Upacara',
    description: 'Upacara bendera rutin setiap hari Senin, diikuti seluruh siswa dan guru.',
  },
  {
    date: '2026-09-07',
    title: 'Kegiatan Akademik',
    location: 'Ruang Kelas',
    description: 'Kegiatan belajar mengajar reguler sesuai jadwal semester berjalan.',
  },
  {
    date: '2026-09-12',
    title: 'Class Meeting',
    location: 'Lingkungan Sekolah',
    description: 'Rangkaian lomba olahraga dan seni antar kelas.',
  },
  {
    date: '2026-08-17',
    title: 'Upacara Peringatan Hari Kemerdekaan RI',
    location: 'Lapangan Upacara',
    description: 'Peringatan Hari Ulang Tahun Kemerdekaan Republik Indonesia.',
  },
];
