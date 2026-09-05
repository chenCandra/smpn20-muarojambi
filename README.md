# Situs SMP Negeri 20 Muaro Jambi

Situs resmi sekolah -- **Explore • Learn • Grow**. Dibangun pakai
[Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com), di-deploy ke
Cloudflare (Workers + Static Assets, deploy manual atau otomatis lewat GitHub Actions).
Sebagian besar halaman tetap statis (cepat, gratis), tapi Berita/Info, Guru & Tenaga
Kependidikan, dan Statistik beranda sekarang dikelola lewat **panel admin** (`/admin`)
yang disimpan di Cloudflare D1 -- lihat bagian [Panel Admin](#panel-admin) di bawah.

## Menjalankan di lokal

```bash
npm install
npx wrangler d1 execute smpn20-cms --local --file=db/schema.sql  # sekali saja, bikin DB lokal
npm run dev
```

Buka `http://localhost:4321`. Binding D1 lokal dipakai lewat `platformProxy`
(Miniflare) -- otomatis, tidak perlu `wrangler dev` terpisah untuk `npm run dev`.

## Struktur proyek

```
src/
├── data/                 # Konten yang MASIH statis (Berita, Guru, Statistik lewat /admin, lihat db/)
│   ├── school.ts         # identitas sekolah (nama, alamat, telepon, dst)
│   ├── events.ts          # agenda/kalender kegiatan
│   ├── extracurriculars.ts # daftar ekstrakurikuler
│   ├── fields.ts           # 6 bidang minat "Explore Your Universe"
│   └── gallery.ts          # foto galeri
├── lib/                   # Backend admin: auth.ts, session.ts, posts.ts, teachers.ts, stats.ts (query D1),
│                           # require-auth.ts, env.ts
├── pages/admin/           # Panel admin (login, posts/, teachers/, stats/) -- lihat Panel Admin di bawah
├── components/            # komponen reusable (Navbar, Hero, NewsCard, TeacherCard, dst)
├── layouts/BaseLayout.astro, AdminLayout.astro
├── pages/                 # /, /profil, /akademik, /kegiatan, /berita, /informasi, /kontak
├── scripts/interactions.ts # reveal-on-scroll, count-up, navbar scroll, mobile menu (vanilla JS)
└── styles/global.css       # design tokens Tailwind v4 (@theme) + komponen (@layer components)

public/
├── images/{hero,teachers,gallery,facilities}/  # taruh foto di sini
├── documents/            # dokumen unduhan (PDF dll), lalu update link-nya di src/pages/informasi.astro
└── favicon.svg

db/
└── schema.sql            # skema Cloudflare D1 (users, sessions, posts, teachers, stats) -- lihat db/README.md
```

## Mengganti konten

**Jangan edit komponen buat ganti teks/data.** Berita & Info, Guru & Tendik, dan
Statistik beranda diedit lewat panel admin (`/admin`, lihat di bawah). Konten lain
masih statis, edit di `src/data/*.ts`:

- Ganti nama Kepala Sekolah, alamat, no. telepon, dst → `src/data/school.ts`
- Tambah/ganti agenda → `src/data/events.ts`

Semua nilai yang belum diketahui pasti ditulis `[Placeholder]` -- **cari `[...]` dan komentar
`<!-- TODO -->` di seluruh proyek**, ganti dengan data resmi begitu tersedia. Jangan pernah data
sekolah dikarang.

## Panel Admin

Tiga jenis konten dikelola lewat `/admin` (login), disimpan di Cloudflare D1 --
bukan lagi lewat file statis. Perubahan langsung tampil di situs publik tanpa
perlu deploy ulang:

- **`/admin/posts`** -- Berita & Pengumuman. Kategori: Prestasi, Akademik, Kegiatan,
  Pengumuman, Sekolah. Status **Draft** vs **Publish** -- draft tidak tampil ke
  publik sampai diubah ke Publish. Tampil di `/`, `/berita`, `/berita/<slug>`, dan
  `/informasi` (kategori "Pengumuman").
- **`/admin/teachers`** -- Guru & Tenaga Kependidikan (nama, jabatan, mapel, foto
  opsional). Tampil di beranda (4 pertama) dan `/profil#guru` (semua).
- **`/admin/stats`** -- kartu angka di beranda (jumlah siswa, guru, dst). Satu
  halaman berisi semua baris, masing-masing punya tombol Simpan/Hapus sendiri,
  plus form tambah baru di bawahnya.

Belum ada upload file gambar (baik sampul berita maupun foto guru) -- kolom
gambar cuma nerima **path/URL teks** (mis. `/images/news/foto.jpg`), jadi file
fotonya sendiri masih harus ditaruh manual ke `public/images/...` lewat kode.

- **URL login**: `https://<domain-situs>/admin/login`
- **Akun awal**: username `admin`, password `Smpn20#2026` -- **segera ganti** lewat
  `db/README.md` (bagian "Membuat/reset akun admin"), jangan dipakai jangka panjang.
- Detail skema database, cara reset password, cara lihat isi database → `db/README.md`.

Ini butuh Worker jalan (bukan situs statis murni lagi) -- karena itu proyek pakai
adapter `@astrojs/cloudflare` dengan *hybrid rendering*: halaman yang butuh data admin
terbaru (`/`, `/profil`, `/berita`, `/informasi`, semua `/admin/*`) di-render tiap
request (`export const prerender = false`), sisanya (Akademik, Kegiatan, Kontak) tetap
statis penuh seperti sebelumnya.

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
- [ ] Ganti password admin bawaan (`Smpn20#2026`) -- lihat `db/README.md`
- [ ] Isi berita/info, data guru & tendik, dan statistik asli lewat `/admin` (bukan lagi file statis)
- [ ] `src/data/events.ts` → agenda asli
- [ ] `src/data/gallery.ts` → foto kegiatan asli (`public/images/gallery/`)
- [ ] `src/pages/profil.astro` → sejarah, visi, misi, struktur organisasi asli
- [ ] `src/pages/informasi.astro` → jadwal & syarat PPDB, dokumen unduhan asli
- [ ] `src/pages/kontak.astro` → embed peta Google Maps asli
- [ ] `public/favicon.svg` → logo sekolah asli (kalau ada) -- lihat juga `src/components/Logo.astro`
