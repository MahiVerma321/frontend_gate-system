import { query } from "@/lib/postgresql";

export async function getEmployeeListData() {
  const result = await query(`
    SELECT
      e.employee_id,

      COUNT(r.id)::int AS total_recognitions,

      MAX(r.created_at) AS last_seen,

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

      CASE
        WHEN EXISTS (
          SELECT 1
          FROM employee_visits v
          WHERE
            v.employee_id = e.employee_id
            AND v.status = 'ACTIVE'
        )
        THEN 'entered'

        WHEN EXISTS (
          SELECT 1
          FROM employee_visits v
          WHERE
            v.employee_id = e.employee_id
            AND v.exit_time IS NOT NULL
        )
        THEN 'exited'

        ELSE 'registered'
      END AS last_event,

      CASE

        WHEN EXISTS (

          SELECT 1

          FROM employee_visits v

          WHERE
            v.employee_id = e.employee_id

            AND DATE(v.entry_time)=CURRENT_DATE

        )

        THEN 'Present'

        WHEN EXISTS (

          SELECT 1

          FROM employee_visits v

          WHERE
            v.employee_id=e.employee_id

        )

        THEN 'Absent'

        ELSE 'Not Marked'

      END AS attendance_today

    FROM employees e

    LEFT JOIN recognition_events r

      ON e.employee_id = r.employee_id

    GROUP BY e.employee_id

    ORDER BY e.employee_id;
  `);

  return result.rows;
}