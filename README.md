# Situs SMP Negeri 20 Muaro Jambi

Situs resmi sekolah, dibangun statis pakai [Astro](https://astro.build) — kontennya
lewat file Markdown (`src/content/berita/`), di-deploy ke Cloudflare (Workers +
Static Assets) lewat `wrangler`.

## Menjalankan di lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:4321`.

## Menambah berita baru

Bikin file `.md` baru di `src/content/berita/`, isi frontmatter-nya:

```md
---
title: "Judul Berita"
pubDate: 2026-09-10
excerpt: "Ringkasan singkat (opsional, tampil di daftar berita)."
---

Isi berita di sini, boleh pakai Markdown biasa (heading, list, gambar, dst).
```

Nama file jadi bagian URL-nya (`selamat-datang.md` -> `/berita/selamat-datang`).

## Build & deploy

### Deploy manual dari komputer sendiri (paling cepat buat mulai)

```bash
npm run build     # hasilnya di folder dist/
npx wrangler login # sekali saja, buka browser buat login akun Cloudflare
npm run deploy     # build lalu `wrangler deploy`
```

Setelah `wrangler login` & `wrangler deploy` pertama kali sukses, situs langsung bisa
diakses lewat alamat gratis `https://smpn20-muarojambi.<nama-akun>.workers.dev`
(muncul di output terminal).

### Deploy otomatis tiap push ke GitHub (`.github/workflows/deploy.yml`)

Sudah disiapkan, tinggal aktifkan sekali:

1. Buka **dash.cloudflare.com** -> **My Profile** -> **API Tokens** -> **Create Token** ->
   pilih template **"Edit Cloudflare Workers"** (atau buat custom token dengan izin
   `Account.Workers Scripts: Edit` dan `Account.Workers Routes: Edit` kalau pakai custom domain).
2. Salin token yang dihasilkan.
3. Di repo GitHub ini: **Settings** -> **Secrets and variables** -> **Actions** ->
   **New repository secret** -> nama `CLOUDFLARE_API_TOKEN`, isi tokennya, simpan.
4. Push apa saja ke branch `master` -> tab **Actions** di GitHub akan otomatis build & deploy.

Setelah ini aktif, siapa pun yang push ke `master` (termasuk edit berita lewat GitHub
web editor, tanpa perlu install apa-apa di komputer) situsnya otomatis ter-update.

## Yang masih perlu dilengkapi

Cari komentar `<!-- TODO -->` di `src/pages/` — beberapa halaman (Profil, PPDB,
Kontak) masih isi placeholder, tinggal diganti data asli sekolah.

- [ ] `astro.config.mjs` -> `site:` ganti ke domain asli
- [ ] `wrangler.jsonc` -> tambah `routes` custom domain begitu domain siap
- [ ] `src/pages/profil.astro` -> sejarah, visi, misi asli
- [ ] `src/pages/ppdb.astro` -> jadwal & syarat PPDB tahun berjalan
- [ ] `src/pages/kontak.astro` -> alamat, telepon, embed peta asli
- [ ] `src/pages/galeri.astro` -> foto kegiatan asli
- [ ] `public/favicon.svg` -> logo sekolah asli (kalau ada)
