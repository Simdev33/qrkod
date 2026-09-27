import "server-only";
import fs from "node:fs";
import path from "node:path";
import { createClient, type Client, type InValue } from "@libsql/client";

// Adatbázis: Turso (libSQL). Élesben (Vercelen) a TURSO_DATABASE_URL + TURSO_AUTH_TOKEN alapján a
// felhőbeli adatbázist használja; helyben, ezek nélkül egy SQLite-fájlt (data/kockakod.db).
// Mindkettő ugyanaz az SQLite-dialektus, így a lekérdezések nem függnek a környezettől.

const TABLES = [
  `CREATE TABLE IF NOT EXISTS codes (
    id                    TEXT PRIMARY KEY,
    token                 TEXT NOT NULL UNIQUE,
    title                 TEXT NOT NULL DEFAULT '',
    target                TEXT NOT NULL,
    design                TEXT NOT NULL,
    created_at            INTEGER NOT NULL,
    trial_ends_at         INTEGER NOT NULL,
    paid_until            INTEGER,
    sub_id                TEXT,
    sub_status            TEXT,
    cancel_at_period_end  INTEGER NOT NULL DEFAULT 0,
    customer_id           TEXT,
    scans                 INTEGER NOT NULL DEFAULT 0,
    missed_scans          INTEGER NOT NULL DEFAULT 0,
    last_scan_at          INTEGER,
    creator               TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS scan_days (
    code_id  TEXT NOT NULL,
    day      TEXT NOT NULL,
    count    INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (code_id, day)
  )`,
];

/** Később hozzáadott oszlopok: a régebbi adatbázisokba ALTER TABLE-lel kerülnek be. */
const ADDED_COLUMNS: [table: string, column: string, type: string][] = [["codes", "creator", "TEXT"]];

const INDEXES = [
  "CREATE INDEX IF NOT EXISTS codes_sub ON codes(sub_id)",
  "CREATE INDEX IF NOT EXISTS codes_creator ON codes(creator, created_at)",
];

function connect(): Client {
  const url = process.env.TURSO_DATABASE_URL?.trim();
  if (url) return createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN?.trim() || undefined });
  if (process.env.VERCEL) {
    throw new Error("Hiányzik a TURSO_DATABASE_URL: Vercelen helyi fájlba nem lehet tartósan menteni.");
  }
  const dir = process.env.DATA_DIR || path.join(process.cwd(), "data");
  fs.mkdirSync(dir, { recursive: true });
  return createClient({ url: `file:${path.join(dir, "kockakod.db").replace(/\\/g, "/")}` });
}

async function init(): Promise<Client> {
  const client = connect();
  await client.batch(TABLES, "write");
  for (const [table, column, type] of ADDED_COLUMNS) {
    const info = await client.execute(`PRAGMA table_info(${table})`);
    if (!info.rows.some((r) => r.name === column)) await client.execute(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}`);
  }
  await client.batch(INDEXES, "write");
  return client;
}

// Egy kapcsolat példányonként (a fejlesztői újratöltések között is).
const g = globalThis as unknown as { __kockakodLibsql?: Promise<Client> };

export function db(): Promise<Client> {
  g.__kockakodLibsql ??= init().catch((err) => {
    g.__kockakodLibsql = undefined;
    throw err;
  });
  return g.__kockakodLibsql;
}

type Row = Record<string, InValue>;

export async function all<T = Row>(sql: string, args: InValue[] = []): Promise<T[]> {
  const rs = await (await db()).execute({ sql, args });
  return rs.rows.map((row) => Object.fromEntries(rs.columns.map((c, i) => [c, row[i]])) as T);
}

export async function one<T = Row>(sql: string, args: InValue[] = []): Promise<T | null> {
  return (await all<T>(sql, args))[0] ?? null;
}

export async function run(sql: string, args: InValue[] = []) {
  return (await db()).execute({ sql, args });
}

export const isUniqueViolation = (err: unknown) =>
  err instanceof Error && /UNIQUE constraint failed|SQLITE_CONSTRAINT/i.test(`${err.message} ${(err as { code?: string }).code ?? ""}`);
