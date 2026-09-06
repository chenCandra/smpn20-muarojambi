export type PostCategory = 'Prestasi' | 'Akademik' | 'Kegiatan' | 'Pengumuman' | 'Sekolah';
export type PostStatus = 'draft' | 'published';

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: PostCategory;
  cover: string | null;
  status: PostStatus;
  published_at: string;
  created_by: number | null;
  created_at: string;
  updated_at: string;
}

export interface PostInput {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: PostCategory;
  cover: string | null;
  status: PostStatus;
  published_at: string;
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

/**
 * Pastikan slug unik -- kalau sudah dipakai baris lain, tambahkan sufiks
 * -2, -3, dst. `excludeId` dipakai saat edit (biar slug post yang sedang
 * diedit sendiri nggak dianggap "sudah dipakai").
 */
export async function ensureUniqueSlug(db: D1Database, baseSlug: string, excludeId?: number): Promise<string> {
  let slug = baseSlug || 'tanpa-judul';
  let suffix = 1;

  while (true) {
    const existing = await db
      .prepare(excludeId ? 'SELECT id FROM posts WHERE slug = ? AND id != ?' : 'SELECT id FROM posts WHERE slug = ?')
      .bind(...(excludeId ? [slug, excludeId] : [slug]))
      .first();

    if (!existing) return slug;
    suffix++;
    slug = `${baseSlug}-${suffix}`;
  }
}

export async function getPublishedPosts(db: D1Database, options: { category?: PostCategory; limit?: number } = {}): Promise<Post[]> {
  const conditions = ["status = 'published'", "published_at <= date('now')"];
  const params: unknown[] = [];

  if (options.category) {
    conditions.push('category = ?');
    params.push(options.category);
  }

  let query = `SELECT * FROM posts WHERE ${conditions.join(' AND ')} ORDER BY published_at DESC, id DESC`;
  if (options.limit) {
    query += ' LIMIT ?';
    params.push(options.limit);
  }

  const result = await db.prepare(query).bind(...params).all<Post>();
  return result.results ?? [];
}

export async function getPublishedPostBySlug(db: D1Database, slug: string): Promise<Post | null> {
  const row = await db
    .prepare("SELECT * FROM posts WHERE slug = ? AND status = 'published' AND published_at <= date('now')")
    .bind(slug)
    .first<Post>();
  return row ?? null;
}

export async function getAllPostsAdmin(db: D1Database, category?: PostCategory): Promise<Post[]> {
  const query = category
    ? 'SELECT * FROM posts WHERE category = ? ORDER BY created_at DESC, id DESC'
    : 'SELECT * FROM posts ORDER BY created_at DESC, id DESC';
  const stmt = category ? db.prepare(query).bind(category) : db.prepare(query);
  const result = await stmt.all<Post>();
  return result.results ?? [];
}

export async function getPostById(db: D1Database, id: number): Promise<Post | null> {
  const row = await db.prepare('SELECT * FROM posts WHERE id = ?').bind(id).first<Post>();
  return row ?? null;
}

export async function createPost(db: D1Database, input: PostInput, createdBy: number): Promise<number> {
  const result = await db
    .prepare(
      `INSERT INTO posts (slug, title, excerpt, content, category, cover, status, published_at, created_by, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`
    )
    .bind(input.slug, input.title, input.excerpt, input.content, input.category, input.cover, input.status, input.published_at, createdBy)
    .run();

  return result.meta.last_row_id as number;
}

export async function updatePost(db: D1Database, id: number, input: PostInput): Promise<void> {
  await db
    .prepare(
      `UPDATE posts SET slug = ?, title = ?, excerpt = ?, content = ?, category = ?, cover = ?, status = ?, published_at = ?, updated_at = datetime('now')
       WHERE id = ?`
    )
    .bind(input.slug, input.title, input.excerpt, input.content, input.category, input.cover, input.status, input.published_at, id)
    .run();
}

export async function deletePost(db: D1Database, id: number): Promise<void> {
  await db.prepare('DELETE FROM posts WHERE id = ?').bind(id).run();
}
