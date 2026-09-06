export interface PpdbRequirement {
  id: number;
  text: string;
  sort_order: number;
}

export interface PpdbRequirementInput {
  text: string;
  sort_order: number;
}

export async function getPpdbRequirements(db: D1Database): Promise<PpdbRequirement[]> {
  const result = await db.prepare('SELECT * FROM ppdb_requirements ORDER BY sort_order, id').all<PpdbRequirement>();
  return result.results ?? [];
}

export async function createPpdbRequirement(db: D1Database, input: PpdbRequirementInput): Promise<number> {
  const result = await db
    .prepare('INSERT INTO ppdb_requirements (text, sort_order) VALUES (?, ?)')
    .bind(input.text, input.sort_order)
    .run();
  return result.meta.last_row_id as number;
}

export async function updatePpdbRequirement(db: D1Database, id: number, input: PpdbRequirementInput): Promise<void> {
  await db
    .prepare('UPDATE ppdb_requirements SET text = ?, sort_order = ? WHERE id = ?')
    .bind(input.text, input.sort_order, id)
    .run();
}

export async function deletePpdbRequirement(db: D1Database, id: number): Promise<void> {
  await db.prepare('DELETE FROM ppdb_requirements WHERE id = ?').bind(id).run();
}
