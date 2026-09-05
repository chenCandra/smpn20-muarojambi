# Database (Cloudflare D1)

Panel admin (`/admin`) disimpan di Cloudflare D1 (SQLite serverless), binding `DB`
(lihat `wrangler.jsonc`). Skemanya di `schema.sql`: tabel `users` (akun admin),
`sessions` (login, opaque token -- bukan JWT), `posts` (berita & info, satu tabel
dibedakan lewat kolom `category`), `teachers` (guru & tenaga kependidikan), dan
`stats` (kartu angka di beranda).

## Menerapkan skema

```bash
# Database lokal (dipakai `npm run dev` lewat platformProxy)
npx wrangler d1 execute smpn20-cms --local --file=db/schema.sql

# Database production (WAJIB juga dijalankan manual sekali di awal,
# migrations_dir otomatis tidak menjalankan ini)
npx wrangler d1 execute smpn20-cms --remote --file=db/schema.sql
```

`CREATE TABLE IF NOT EXISTS` -- aman dijalankan ulang, tidak menghapus data yang
sudah ada.

## Membuat/reset akun admin

Password disimpan sebagai `<salt_hex>:<hash_hex>` (PBKDF2-SHA256, 100.000 iterasi --
lihat `src/lib/auth.ts`), bukan plaintext. Buat hash baru lewat Node:

```bash
node -e "
const { pbkdf2Sync, randomBytes } = require('crypto');
const password = 'GANTI_PASSWORD_DI_SINI';
const salt = randomBytes(16);
const hash = pbkdf2Sync(password, salt, 100000, 32, 'sha256');
console.log(salt.toString('hex') + ':' + hash.toString('hex'));
"
```

Lalu terapkan (ganti `--remote` jadi `--local` buat database dev):

```bash
npx wrangler d1 execute smpn20-cms --remote --command \
  "UPDATE users SET password_hash = '<hasil_hash_di_atas>' WHERE username = 'admin';"
```

Buat akun admin baru dengan pola yang sama, tinggal `INSERT` bukan `UPDATE`.

## Melihat isi database

```bash
npx wrangler d1 execute smpn20-cms --remote --command "SELECT id, username, name FROM users;"
npx wrangler d1 execute smpn20-cms --remote --command "SELECT id, title, category, status, published_at FROM posts ORDER BY id DESC;"
```
