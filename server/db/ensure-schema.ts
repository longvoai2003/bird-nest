import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getSql } from "@/server/db/client";

let schemaReady: Promise<void> | null = null;

export function ensureSchema() {
    if (schemaReady) {
        return schemaReady;
    }

    schemaReady = (async () => {
        const schemaPath = resolve(process.cwd(), "db/init/001_init.sql");
        const schemaSql = readFileSync(schemaPath, "utf8");

        await getSql().unsafe(schemaSql);
    })();

    return schemaReady;
}
