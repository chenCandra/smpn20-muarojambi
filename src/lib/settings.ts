// Setting teks bebas satu-satuan (key-value), generik -- dipakai pertama
// kali buat paragraf info PPDB ('ppdb_intro'), tapi bisa dipakai lagi buat
// setting teks lain nanti tanpa perlu tabel baru.
export async function getSetting(db: D1Database, key: string, fallback = ''): Promise<string> {
  const row = await db.prepare('SELECT value FROM settings WHERE key = ?').bind(key).first<{ value: string }>();
  return row?.value ?? fallback;
}

export async function setSetting(db: D1Database, key: string, value: string): Promise<void> {
  await db
    .prepare(
      `INSERT INTO settings (key, value, updated_at) VALUES (?, ?, datetime('now'))
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`
    )
    .bind(key, value)
    .run();
}
