// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: ganti ke domain asli begitu sudah ditentukan/dibeli (biasanya
  // .sch.id untuk sekolah negeri) -- dipakai buat sitemap.xml & canonical
  // URL, jadi harus persis alamat situs yang sebenarnya dipakai publik.
  site: 'https://smpn20muarojambi.sch.id',
  integrations: [sitemap()],
  vite: {
    // Tailwind v4 -- plugin Vite, bukan integrasi @astrojs/tailwind lama
    // (sudah deprecated). Config-nya CSS-first lewat @theme di
    // src/styles/global.css, bukan file tailwind.config.js terpisah.
    plugins: [tailwindcss()],
  },
});
