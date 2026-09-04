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

```bash
npm run build     # hasilnya di folder dist/
npm run deploy     # build lalu `wrangler deploy` (butuh sudah `wrangler login` / API token)
```

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
