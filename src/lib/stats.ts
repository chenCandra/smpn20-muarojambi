export interface Stat {
  id: number;
  label: string;
  value: number;
  suffix: string;
  sort_order: number;
}

export interface StatInput {
  label: string;
  value: number;
  suffix: string;
  sort_order: number;
}

export async function getStats(db: D1Database): Promise<Stat[]> {
  const result = await db.prepare('SELECT * FROM stats ORDER BY sort_order, id').all<Stat>();
  return result.results ?? [];
}

export async function getStatById(db: D1Database, id: number): Promise<Stat | null> {
  const row = await db.prepare('SELECT * FROM stats WHERE id = ?').bind(id).first<Stat>();
  return row ?? null;
}

export async function createStat(db: D1Database, input: StatInput): Promise<number> {
  const result = await db
    .prepare('INSERT INTO stats (label, value, suffix, sort_order) VALUES (?, ?, ?, ?)')
    .bind(input.label, input.value, input.suffix, input.sort_order)
    .run();
  return result.meta.last_row_id as number;
}

export async function updateStat(db: D1Database, id: number, input: StatInput): Promise<void> {
  await db
    .prepare('UPDATE stats SET label = ?, value = ?, suffix = ?, sort_order = ? WHERE id = ?')
    .bind(input.label, input.value, input.suffix, input.sort_order, id)
    .run();
}

export async function deleteStat(db: D1Database, id: number): Promise<void> {
  await db.prepare('DELETE FROM stats WHERE id = ?').bind(id).run();
}
