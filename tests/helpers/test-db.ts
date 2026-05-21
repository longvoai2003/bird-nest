import postgres from "postgres";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export const hasTestDatabase = Boolean(process.env.TEST_DATABASE_URL);

let cachedTestSql: postgres.Sql | null = null;

function getTestDatabaseUrl() {
  const testDatabaseUrl = process.env.TEST_DATABASE_URL;

  if (!testDatabaseUrl) {
    throw new Error("TEST_DATABASE_URL is required for integration tests");
  }

  if (!testDatabaseUrl.includes("birdnest_test")) {
    throw new Error("TEST_DATABASE_URL must point to birdnest_test");
  }

  return testDatabaseUrl;
}

export function getTestSql() {
  if (cachedTestSql) {
    return cachedTestSql;
  }

  const testDatabaseUrl = getTestDatabaseUrl();

  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = testDatabaseUrl;
  }

  cachedTestSql = postgres(testDatabaseUrl, {
    max: 1,
  });

  return cachedTestSql;
}

export async function ensureSchema() {
  const schemaPath = resolve(import.meta.dir, "../../db/init/001_init.sql");
  const schemaSql = readFileSync(schemaPath, "utf8");

  await getTestSql().unsafe(schemaSql);
}

export async function resetDatabase() {
  await getTestSql().unsafe(`
    truncate table order_items, orders, contact_requests restart identity cascade;
  `);
}

export async function closeDatabase() {
  if (!cachedTestSql) {
    return;
  }

  await cachedTestSql.end();
  cachedTestSql = null;
}
