import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const berita = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/berita' }),
  // `cover` sengaja string path biasa (bukan helper `image()` Astro yang
  // memvalidasi file benar-benar ada) -- situs ini belum punya foto asli,
  // jadi field-nya boleh diisi belakangan tanpa build gagal karena file
  // hilang. Ganti ke `image()` kalau nanti mau optimasi gambar otomatis.
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    excerpt: z.string().optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { berita };
