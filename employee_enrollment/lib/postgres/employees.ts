import { pgPool } from "@/lib/postgresql";

/**
 * Employee List
 */
export async function getEmployeeVisitSummary() {
  const result = await pgPool.query(`
    SELECT
      e.employee_id,

      CASE
        WHEN EXISTS (
          SELECT 1
          FROM employee_visits v
          WHERE
            v.employee_id = e.employee_id
            AND v.status = 'ACTIVE'
        )
        THEN 'inside'
        ELSE 'outside'
      END AS status,

      (
        SELECT MAX(created_at)
        FROM recognition_events r
        WHERE r.employee_id = e.employee_id
      ) AS last_seen,

      (
        SELECT COUNT(*)
        FROM recognition_events r
        WHERE r.employee_id = e.employee_id
      )::int AS total_recognitions

    FROM employees e;
  `);

  return result.rows;
}

/**
 * Recognition History
 */
export async function getEmployeeRecognitionHistory(
  employeeId: string
) {
  const result = await pgPool.query(
    `
    SELECT
      created_at,
      confidence,
      camera_type
    FROM recognition_events
    WHERE employee_id = $1
    ORDER BY created_at DESC
    `,
    [employeeId]
  );

  return result.rows;
}

/**
 * Attendance History
 */
export async function getEmployeeAttendanceHistory(
  employeeId: string
) {
  const result = await pgPool.query(
    `
    SELECT
      entry_time,
      exit_time,
      status
    FROM employee_visits
    WHERE employee_id = $1
    ORDER BY entry_time DESC
    `,
    [employeeId]
  );

  return result.rows;
}

/**
 * Employee statistics
 */
export async function getEmployeeProfileStats(
  employeeId: string
) {
  const result = await pgPool.query(
    `
    SELECT
      COUNT(*) FILTER (
        WHERE confidence >= 0
      ) AS total_recognitions
    FROM recognition_events
    WHERE employee_id = $1
    `,
    [employeeId]
  );

  return result.rows[0];
}

/**
 * Delete PostgreSQL employee data
 */
export async function deleteEmployeeData(
  employeeId: string
) {
  await pgPool.query(
    `
    DELETE FROM employees
    WHERE employee_id = $1
    `,
    [employeeId]
  );
}