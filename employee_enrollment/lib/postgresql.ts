import { Pool } from "pg";

const globalForPg = global as typeof globalThis & {
  pgPool?: Pool;
};

export const pgPool =
  globalForPg.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPg.pgPool = pgPool;
}

export async function query(
  text: string,
  params?: any[]
) {
  return pgPool.query(text, params);
}