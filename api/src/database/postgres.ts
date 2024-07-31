import { Pool, PoolClient } from 'pg';

export class DatabaseConnection {

    private pool: Pool;
    client: PoolClient;

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
        this.client = await this.pool.connect(); 
        console.log('Connected to the PostgreSQL database');
    }

    async close(): Promise<void> {
        try {
            await this.pool.end();
            console.log("Closing Connection to database")
        }
        catch(error) {
            console.debug(`Total clients: ${this.pool.totalCount}`);
            console.debug(`Idle clients: ${this.pool.idleCount}`);
            console.debug(`Active clients: ${this.pool.totalCount - this.pool.idleCount}`);

            console.error("Failed to end connection to database", error)
        }
    }
}

