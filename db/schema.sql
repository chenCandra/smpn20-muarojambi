-- Skema database admin CMS (Cloudflare D1 / SQLite).
-- Dijalankan lewat: wrangler d1 execute smpn20-cms --file=db/schema.sql
-- (tambah --local buat dev lokal, tanpa --local buat database production).

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL, -- format "<salt_hex>:<hash_hex>", lihat src/lib/auth.ts
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY, -- token acak 32-byte hex, ITU SENDIRI kredensial (opaque session, bukan JWT)
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Berita & Pengumuman/Info -- SATU tabel, dibedakan lewat kolom `category`
-- (sama seperti src/data/news.ts sebelumnya: Prestasi/Akademik/Kegiatan/
-- Pengumuman/Sekolah) -- "berita" dan "info" yang diminta user memang satu
-- model data yang sama di situs ini, cuma beda kategori tampilannya.
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL, -- teks bebas, paragraf dipisah baris kosong (\n\n) -- lihat pemakaian di halaman render
  category TEXT NOT NULL CHECK (category IN ('Prestasi', 'Akademik', 'Kegiatan', 'Pengumuman', 'Sekolah')),
  cover TEXT, -- path/URL gambar, opsional
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TEXT NOT NULL DEFAULT (date('now')),
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_posts_status_published ON posts(status, published_at);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);
