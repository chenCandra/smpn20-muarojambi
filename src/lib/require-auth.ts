import type { AstroGlobal } from 'astro';
import { getSessionUser, type SessionUser } from './session';
import { SESSION_COOKIE } from './auth';
import { env } from './env';

/**
 * Guard buat semua halaman /admin/* -- dipanggil di baris pertama
 * frontmatter tiap halaman admin:
 *
 *   const auth = await requireAuth(Astro);
 *   if (auth instanceof Response) return auth;
 *   const user = auth;
 *
 * Astro cuma bisa redirect kalau frontmatter me-return Response secara
 * LANGSUNG (bukan lewat fungsi terpisah) -- makanya helper ini
 * mengembalikan union type (Response | SessionUser), bukan langsung
 * redirect sendiri.
 */
export async function requireAuth(Astro: AstroGlobal): Promise<SessionUser | Response> {
  const db = env.DB;
  const token = Astro.cookies.get(SESSION_COOKIE)?.value;
  const user = await getSessionUser(db, token);

  if (!user) {
    const next = encodeURIComponent(Astro.url.pathname);
    return Astro.redirect(`/admin/login?next=${next}`);
  }

  return user;
}
