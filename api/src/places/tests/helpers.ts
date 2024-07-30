import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.DATABASE_PORT),
});

export const setupDatabase = async () => {
    await pool.query('DROP TABLE IF EXISTS places;');
    await pool.query(`
        CREATE TABLE places (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255)
        );
    `);
};

export const tearDownDatabase = async () => {
    await pool.query('DROP TABLE IF EXISTS places;');
};

export const closePool = async () => {
    await pool.end();
};
