import { Pool } from 'pg';

export class DatabaseConnection {

    pool: Pool;

    constructor(pool?: Pool) {
        if (pool === undefined) {
            this.pool = new Pool({
                user: process.env.POSTGRES_USER,
                host: process.env.DATABASE_HOST,
                database: process.env.POSTGRES_DB,
                password: process.env.POSTGRES_PASSWORD,
                port: Number(process.env.DATABASE_PORT), 
            });
        } else {
            this.pool = pool;
        }
    }

    async connect(): Promise<void> {
        try {
            await this.pool.connect(); 
            console.log('Connected to the PostgreSQL database');
        } catch (error) {
            console.error('Database connection failed', error);
            process.exit(1);
        }
    }

    async close(): Promise<void> {
        try {
            await this.pool.end();
        }
        catch(error) {
            console.error("Failed to end connection to database", error)
        }
    }
}
// Function to connect to the database and log the connection status

