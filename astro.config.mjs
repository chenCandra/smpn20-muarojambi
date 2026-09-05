// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // TODO: ganti ke domain asli begitu sudah ditentukan/dibeli (biasanya
  // .sch.id untuk sekolah negeri) -- dipakai buat sitemap.xml & canonical
  // URL, jadi harus persis alamat situs yang sebenarnya dipakai publik.
  site: 'https://smpn20muarojambi.sch.id',
  integrations: [sitemap()],

  // Output tetap "static" (default) -- sebagian besar halaman (Profil,
  // Akademik, Kegiatan, Kontak) tetap prerender penuh di build time (cepat,
  // gratis, nggak butuh worker jalan). Halaman yang butuh data admin
  // terbaru (Beranda, Berita, Informasi, semua /admin & /api) di-opt-out
  // manual lewat `export const prerender = false` di masing-masing file --
  // pola "hybrid rendering" resmi Astro, bukan output:'server' penuh.
  adapter: cloudflare({
    // platformProxy bikin `astro dev` bisa akses binding D1 lokal (lewat
    // Miniflare) tanpa perlu `wrangler dev` terpisah -- baca db/schema.sql
    // yang sudah diterapkan ke .wrangler/state/v3/d1 (lihat db/README.md).
    platformProxy: { enabled: true },
    // Default adapter otomatis nambahin binding KV (Session) & Images yang
    // sebenarnya kita nggak pakai (login/CMS kita pakai tabel `sessions` D1
    // sendiri di src/lib/session.ts, dan semua gambar cuma <img> biasa,
    // bukan astro:assets). "passthrough" biar nggak butuh binding IMAGES.
    imageService: 'passthrough',
  }),

  // Matikan Session API bawaan Astro (beda dari sistem login kita sendiri)
  // biar adapter nggak auto-provision KV namespace yang nggak kepakai.
  session: false,

  vite: {
    // Tailwind v4 -- plugin Vite, bukan integrasi @astrojs/tailwind lama
    // (sudah deprecated). Config-nya CSS-first lewat @theme di
    // src/styles/global.css, bukan file tailwind.config.js terpisah.
    plugins: [tailwindcss()],
  },
});
