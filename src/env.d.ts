/// <reference path="../.astro/types.d.ts" />

// Binding D1 & Assets dideklarasikan di wrangler.jsonc ("d1_databases" ->
// binding "DB", "assets" -> binding "ASSETS"). Astro v6+ MENGHAPUS
// `Astro.locals.runtime.env` -- cara resminya sekarang import langsung dari
// modul runtime "cloudflare:workers" (lihat src/lib/env.ts).
interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}

declare module 'cloudflare:workers' {
  export const env: Env;
}
