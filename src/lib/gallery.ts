export type GalleryPhotoSize = 'landscape' | 'portrait' | 'square';

export interface GalleryPhoto {
  id: number;
  src: string;
  alt: string;
  caption: string | null;
  size: GalleryPhotoSize;
  sort_order: number;
}

export interface GalleryPhotoInput {
  src: string;
  alt: string;
  caption: string | null;
  size: GalleryPhotoSize;
  sort_order: number;
}

export async function getGalleryPhotos(db: D1Database): Promise<GalleryPhoto[]> {
  const result = await db.prepare('SELECT * FROM gallery ORDER BY sort_order, id').all<GalleryPhoto>();
  return result.results ?? [];
}

export async function getGalleryPhotoById(db: D1Database, id: number): Promise<GalleryPhoto | null> {
  const row = await db.prepare('SELECT * FROM gallery WHERE id = ?').bind(id).first<GalleryPhoto>();
  return row ?? null;
}

export async function createGalleryPhoto(db: D1Database, input: GalleryPhotoInput): Promise<number> {
  const result = await db
    .prepare('INSERT INTO gallery (src, alt, caption, size, sort_order) VALUES (?, ?, ?, ?, ?)')
    .bind(input.src, input.alt, input.caption, input.size, input.sort_order)
    .run();
  return result.meta.last_row_id as number;
}

export async function updateGalleryPhoto(db: D1Database, id: number, input: GalleryPhotoInput): Promise<void> {
  await db
    .prepare('UPDATE gallery SET src = ?, alt = ?, caption = ?, size = ?, sort_order = ? WHERE id = ?')
    .bind(input.src, input.alt, input.caption, input.size, input.sort_order, id)
    .run();
}

export async function deleteGalleryPhoto(db: D1Database, id: number): Promise<void> {
  await db.prepare('DELETE FROM gallery WHERE id = ?').bind(id).run();
}
