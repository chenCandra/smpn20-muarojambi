// Auth sederhana buat admin panel -- SENGAJA tanpa library eksternal
// (bcrypt dkk tidak tersedia di runtime Workers), pakai Web Crypto API
// (SubtleCrypto) yang sudah built-in di semua browser & Workers runtime.
//
// Password: PBKDF2-SHA256, 100.000 iterasi, salt acak 16 byte per user.
// Disimpan satu kolom "password_hash" format "<salt_hex>:<hash_hex>".
//
// Sesi: token acak 32 byte (256 bit entropi) sebagai PRIMARY KEY tabel
// `sessions` -- ini pola "opaque session token" standar (token itu sendiri
// kredensial, bukan JWT yang perlu ditandatangani/diverifikasi), jadi
// keamanannya cukup selama token acak+HttpOnly+Secure+SameSite, tanpa
// perlu skema signing tambahan.

const PBKDF2_ITERATIONS = 100_000;

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function fromHex(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

async function pbkdf2(password: string, salt: Uint8Array): Promise<ArrayBuffer> {
  const keyMaterial = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, [
    'deriveBits',
  ]);
  return crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: salt as BufferSource, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    keyMaterial,
    256
  );
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const derived = await pbkdf2(password, salt);
  return `${toHex(salt.buffer)}:${toHex(derived)}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [saltHex, hashHex] = storedHash.split(':');
  if (!saltHex || !hashHex) return false;

  const salt = fromHex(saltHex);
  const derived = await pbkdf2(password, salt);
  const derivedHex = toHex(derived);

  // Bandingkan dalam waktu konstan (hindari timing attack yang bocorin
  // panjang kecocokan lewat perbedaan waktu eksekusi).
  if (derivedHex.length !== hashHex.length) return false;
  let diff = 0;
  for (let i = 0; i < derivedHex.length; i++) {
    diff |= derivedHex.charCodeAt(i) ^ hashHex.charCodeAt(i);
  }
  return diff === 0;
}

export function generateSessionToken(): string {
  return toHex(crypto.getRandomValues(new Uint8Array(32)).buffer);
}

export const SESSION_COOKIE = 'smpn20_session';
export const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 hari
