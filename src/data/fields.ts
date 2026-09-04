// "Explore Your Universe" -- 6 bidang minat luas yang bisa dijelajahi siswa
// (beda dari daftar ekstrakurikuler spesifik di extracurriculars.ts).
export interface Field {
  name: string;
  icon: string; // nama ikon di Icon.astro
  description: string;
}

export const fields: Field[] = [
  { name: 'Sains & Teknologi', icon: 'flask', description: 'Eksperimen, riset, dan rasa ingin tahu tentang dunia.' },
  { name: 'Seni & Kreativitas', icon: 'palette', description: 'Ruang berekspresi lewat gambar, musik, dan karya.' },
  { name: 'Olahraga', icon: 'ball', description: 'Membangun fisik yang sehat dan jiwa sportif.' },
  { name: 'Literasi', icon: 'book', description: 'Gemar membaca, menulis, dan bercerita.' },
  { name: 'Lingkungan', icon: 'leaf', description: 'Peduli dan menjaga kelestarian alam sekitar.' },
  { name: 'Organisasi & Kepemimpinan', icon: 'users', description: 'Belajar memimpin, bekerja sama, dan bertanggung jawab.' },
];
