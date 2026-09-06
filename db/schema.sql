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

-- Kartu statistik di beranda (jumlah siswa, guru, dst) -- sebelumnya
-- src/data/school.ts (export `stats`), sekarang diedit lewat /admin/stats.
CREATE TABLE IF NOT EXISTS stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label TEXT NOT NULL,
  value INTEGER NOT NULL,
  suffix TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_stats_sort ON stats(sort_order);

-- Direktori guru & tenaga kependidikan -- sebelumnya src/data/teachers.ts,
-- sekarang diedit lewat /admin/teachers.
CREATE TABLE IF NOT EXISTS teachers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  subject TEXT,
  photo TEXT, -- path/URL foto, opsional (sama seperti posts.cover -- teks link, bukan upload file)
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_teachers_sort ON teachers(sort_order);

-- Setting teks bebas satu-satuan (key-value) -- dipakai buat paragraf info
-- PPDB (key 'ppdb_intro') di /admin/ppdb. Generik biar bisa dipakai buat
-- setting teks lain nanti tanpa perlu tabel baru tiap kali.
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Daftar syarat pendaftaran PPDB -- sebelumnya array `syaratPpdb` hardcode
-- di src/pages/informasi.astro, sekarang diedit lewat /admin/ppdb.
CREATE TABLE IF NOT EXISTS ppdb_requirements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_ppdb_requirements_sort ON ppdb_requirements(sort_order);

-- Galeri foto -- sebelumnya src/data/gallery.ts, sekarang diedit lewat
-- /admin/gallery. Dipakai di galeri Hero (beranda) & "Moments at SMPN 20".
CREATE TABLE IF NOT EXISTS gallery (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  src TEXT NOT NULL, -- path/URL foto, teks link (bukan upload file)
  alt TEXT NOT NULL,
  caption TEXT,
  size TEXT NOT NULL DEFAULT 'landscape' CHECK (size IN ('landscape', 'portrait', 'square')),
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_gallery_sort ON gallery(sort_order);
