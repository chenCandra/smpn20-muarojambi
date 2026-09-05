// Astro v6+ menghapus `Astro.locals.runtime.env` -- binding Cloudflare
// (D1, Assets, dst) sekarang diakses langsung lewat modul runtime
// "cloudflare:workers", bukan dari Astro.locals lagi. File ini cuma
// re-export biar tiap halaman nggak perlu tahu detail itu satu-satu.
import { env } from 'cloudflare:workers';

export { env };
