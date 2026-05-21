import postgres from "postgres";

type GlobalWithSql = typeof globalThis & {
    birdNestSql?: postgres.Sql;
};

function createSqlClient() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        throw new Error("DATABASE_URL is required");
    }

    return postgres(databaseUrl, {
        max: 10,
    });
}

const globalWithSql = globalThis as GlobalWithSql;

export function getSql() {
    if (globalWithSql.birdNestSql) {
        return globalWithSql.birdNestSql;
    }

    const sql = createSqlClient();

    if (process.env.NODE_ENV !== "production") {
        globalWithSql.birdNestSql = sql;
    }

    return sql;
}

export const sql = new Proxy({} as postgres.Sql, {
    get(_target, property, receiver) {
        return Reflect.get(getSql(), property, receiver);
    },
});
