// Ekstrakurikuler -- `icon` merujuk ke nama ikon di komponen Icon.astro.
export interface Extracurricular {
  name: string;
  icon: string;
  description?: string;
}

export const extracurriculars: Extracurricular[] = [
  { name: 'Futsal', icon: 'ball', description: 'Latihan rutin & kompetisi antar sekolah.' },
  { name: 'Badminton', icon: 'shuttlecock', description: 'Mengasah kelincahan dan kerja sama tim.' },
  { name: 'Pencak Silat', icon: 'fist', description: 'Seni bela diri tradisional Indonesia.' },
  { name: 'Seni', icon: 'palette', description: 'Menggambar, melukis, dan seni rupa.' },
  { name: 'Paduan Suara', icon: 'mic', description: 'Olah vokal dan penampilan bersama.' },
  { name: 'KIR', icon: 'flask', description: 'Karya Ilmiah Remaja -- riset & eksperimen.' },
  { name: 'Pramuka', icon: 'tent', description: 'Kepramukaan, kemandirian, dan kerja sama.' },
  { name: 'OSIS', icon: 'megaphone', description: 'Organisasi Siswa Intra Sekolah.' },
];
