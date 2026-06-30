import { pgPool } from "@/lib/postgresql";

export async function getRecentRecognitions(limit = 5) {
  const result = await pgPool.query(
    `
    SELECT
      employee_id,
      confidence,
      camera_type,
      created_at
    FROM recognition_events
    ORDER BY created_at DESC
    LIMIT $1
    `,
    [limit]
  );

  return result.rows;
}