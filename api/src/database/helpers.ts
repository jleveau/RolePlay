import { GenericContainer, StartedTestContainer, Wait } from 'testcontainers';
import { Pool } from 'pg';

let container: StartedTestContainer;
let pool: Pool;

export const startDatabaseContainer = async () => {
    container = await new GenericContainer("postgres")
        .withEnvironment({
            "POSTGRES_DB": "testdb",
            "POSTGRES_USER": "user",
            "POSTGRES_PASSWORD": "password"
        })
        .withExposedPorts(5432)
        .withWaitStrategy(Wait.forLogMessage('database system is ready to accept connections'))
        .start();

    const mappedPort = container.getMappedPort(5432);
    const host = container.getHost();

    pool = new Pool({
        user: 'user',
        host: host,
        database: 'testdb',
        password: 'password',
        port: mappedPort,
    });
    for (let i = 0; i < 10; i++) {
        try {
            await pool.connect();
            console.log('Successfully connected to the database.');
            return;  // Exit if connection is successful
        } catch (error) {
            console.error('Failed to connect to database, retrying...', error);
            await new Promise(res => setTimeout(res, 5000));  // Wait 5 seconds before retrying
        }
    }
    throw new Error('Failed to connect to the database after multiple attempts.');

};

export const stopDatabaseContainer = async () => {
    await pool.end();
    await container.stop();
};

export const getPool = () => pool;
