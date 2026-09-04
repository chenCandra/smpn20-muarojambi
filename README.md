# Situs SMP Negeri 20 Muaro Jambi

Situs resmi sekolah -- **Explore • Learn • Grow**. Dibangun statis pakai
[Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com), di-deploy ke
Cloudflare (Workers + Static Assets, deploy manual atau otomatis lewat GitHub Actions).

## Menjalankan di lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:4321`.

## Struktur proyek

```
src/
├── data/                 # SEMUA konten dipisah dari UI -- edit di sini, bukan di komponen
│   ├── school.ts         # identitas sekolah + statistik (jumlah siswa, guru, dst)
│   ├── teachers.ts       # direktori guru & tenaga kependidikan
│   ├── news.ts            # berita (dummy data, ganti dengan berita asli)
│   ├── events.ts          # agenda/kalender kegiatan
│   ├── extracurriculars.ts # daftar ekstrakurikuler
│   ├── fields.ts           # 6 bidang minat "Explore Your Universe"
│   └── gallery.ts          # foto galeri
├── components/            # komponen reusable (Navbar, Hero, NewsCard, dst)
├── layouts/BaseLayout.astro
├── pages/                 # /, /profil, /akademik, /kegiatan, /berita, /informasi, /kontak
├── scripts/interactions.ts # reveal-on-scroll, count-up, navbar scroll, mobile menu (vanilla JS)
└── styles/global.css       # design tokens Tailwind v4 (@theme) + komponen (@layer components)

public/
├── images/{hero,news,teachers,gallery,facilities}/  # taruh foto di sini
├── documents/            # dokumen unduhan (PDF dll), lalu update link-nya di src/pages/informasi.astro
└── favicon.svg
```

## Mengganti konten

**Jangan edit komponen buat ganti teks/data** -- edit file di `src/data/*.ts`. Contoh:

- Ganti nama Kepala Sekolah, alamat, no. telepon, dst → `src/data/school.ts`
- Tambah/ganti berita → `src/data/news.ts` (field `slug` jadi bagian URL: `/berita/<slug>`)
- Tambah/ganti guru → `src/data/teachers.ts`
- Tambah/ganti agenda → `src/data/events.ts`

Semua nilai yang belum diketahui pasti ditulis `[Placeholder]` -- **cari `[...]` dan komentar
`<!-- TODO -->` di seluruh proyek**, ganti dengan data resmi begitu tersedia. Jangan pernah data
sekolah dikarang.

## Build & deploy

### Deploy manual dari komputer sendiri

```bash
npm run build      # hasilnya di folder dist/
npx wrangler login  # sekali saja, buka browser buat login akun Cloudflare
npm run deploy      # build lalu wrangler deploy
```

### Deploy otomatis tiap push ke GitHub (`.github/workflows/deploy.yml`)

1. Buka **dash.cloudflare.com** → **My Profile** → **API Tokens** → **Create Token** → template
   **"Edit Cloudflare Workers"**.
2. Di repo GitHub: **Settings** → **Secrets and variables** → **Actions** → **New repository
   secret** → nama `CLOUDFLARE_API_TOKEN`, isi tokennya.
3. Push ke `master` → tab **Actions** otomatis build & deploy.

## Yang masih perlu dilengkapi

- [ ] `astro.config.mjs` → `site:` ganti ke domain asli
- [ ] `wrangler.jsonc` → tambah `routes` custom domain begitu domain siap
- [ ] `src/data/school.ts` → identitas sekolah asli (alamat, telepon, email, NPSN, sosial media)
- [ ] `src/data/teachers.ts` → data guru asli + foto (`public/images/teachers/`)
- [ ] `src/data/news.ts` → berita asli (data contoh sekarang ditandai `[Contoh]`)
- [ ] `src/data/events.ts` → agenda asli
- [ ] `src/data/gallery.ts` → foto kegiatan asli (`public/images/gallery/`)
- [ ] `src/pages/profil.astro` → sejarah, visi, misi, struktur organisasi asli
- [ ] `src/pages/informasi.astro` → jadwal & syarat PPDB, dokumen unduhan asli
- [ ] `src/pages/kontak.astro` → embed peta Google Maps asli
- [ ] `public/favicon.svg` → logo sekolah asli (kalau ada) -- lihat juga `src/components/Logo.astro`
