import { generateSessionToken, SESSION_DURATION_MS } from './auth';

export interface SessionUser {
  id: number;
  username: string;
  name: string;
}

export async function createSession(db: D1Database, userId: number): Promise<string> {
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS).toISOString();

  await db.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)').bind(token, userId, expiresAt).run();

  return token;
}

export async function getSessionUser(db: D1Database, token: string | undefined): Promise<SessionUser | null> {
  if (!token) return null;

  const row = await db
    .prepare(
      `SELECT users.id as id, users.username as username, users.name as name
       FROM sessions
       JOIN users ON users.id = sessions.user_id
       WHERE sessions.token = ? AND sessions.expires_at > datetime('now')`
    )
    .bind(token)
    .first<SessionUser>();

  return row ?? null;
}

export async function destroySession(db: D1Database, token: string | undefined): Promise<void> {
  if (!token) return;
  await db.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
}

/**
 * Bersih-bersih sesi kedaluwarsa -- dipanggil sesekali saat login (bukan
 * cron terjadwal terpisah, biar nggak nambah moving part) supaya tabel
 * sessions nggak numpuk baris mati selamanya.
 */
export async function pruneExpiredSessions(db: D1Database): Promise<void> {
  await db.prepare("DELETE FROM sessions WHERE expires_at <= datetime('now')").run();
}
