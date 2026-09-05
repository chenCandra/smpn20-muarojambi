export interface Teacher {
  id: number;
  name: string;
  position: string;
  subject: string | null;
  photo: string | null; // path/URL foto, opsional -- teks link, bukan upload file
  sort_order: number;
}

export interface TeacherInput {
  name: string;
  position: string;
  subject: string | null;
  photo: string | null;
  sort_order: number;
}

export async function getTeachers(db: D1Database): Promise<Teacher[]> {
  const result = await db.prepare('SELECT * FROM teachers ORDER BY sort_order, id').all<Teacher>();
  return result.results ?? [];
}

export async function getTeacherById(db: D1Database, id: number): Promise<Teacher | null> {
  const row = await db.prepare('SELECT * FROM teachers WHERE id = ?').bind(id).first<Teacher>();
  return row ?? null;
}

export async function createTeacher(db: D1Database, input: TeacherInput): Promise<number> {
  const result = await db
    .prepare('INSERT INTO teachers (name, position, subject, photo, sort_order) VALUES (?, ?, ?, ?, ?)')
    .bind(input.name, input.position, input.subject, input.photo, input.sort_order)
    .run();
  return result.meta.last_row_id as number;
}

export async function updateTeacher(db: D1Database, id: number, input: TeacherInput): Promise<void> {
  await db
    .prepare('UPDATE teachers SET name = ?, position = ?, subject = ?, photo = ?, sort_order = ? WHERE id = ?')
    .bind(input.name, input.position, input.subject, input.photo, input.sort_order, id)
    .run();
}

export async function deleteTeacher(db: D1Database, id: number): Promise<void> {
  await db.prepare('DELETE FROM teachers WHERE id = ?').bind(id).run();
}
