import { GenericContainer, StartedTestContainer, Wait } from 'testcontainers';
import { Pool } from 'pg';
import { DatabaseConnection } from './postgres';


const TEST_DATABASE = "testdb";
const TEST_DATABASE_USER = "user";
const TEST_DATABASE_PASSWORD = "password"
const MAX_RETRY_CONNECTION_ATTEMPT = 10;
export class DatabaseContainer {

    private container: StartedTestContainer;
    connection: DatabaseConnection;

    async start () {
        this.container = await new GenericContainer("postgres")
            .withEnvironment({
                "POSTGRES_DB": TEST_DATABASE,
                "POSTGRES_USER": TEST_DATABASE_USER,
                "POSTGRES_PASSWORD": TEST_DATABASE_PASSWORD
            })
            .withExposedPorts(5432)
            .withWaitStrategy(Wait.forLogMessage('database system is ready to accept connections'))
            .withLogConsumer((stream) => {
                stream.on("error", (error) => {
                    console.error(error);
                })
            })
            .start();

        const mappedPort = this.container.getMappedPort(5432);
        const host = this.container.getHost();

        const pool = new Pool({
            user: TEST_DATABASE_USER,
            host: host,
            database: TEST_DATABASE,
            password: TEST_DATABASE_PASSWORD,
            port: mappedPort,
        });
        this.connection = new DatabaseConnection(pool);

        for (let i = 0; i < MAX_RETRY_CONNECTION_ATTEMPT; i++) {
            try {
                await this.connection.connect();
                console.info('Successfully connected to the container database.');
                return;
            } catch (error) {
                await new Promise(res => setTimeout(res, 5000));
            }
        }
        throw new Error('Failed to connect to the database after multiple attempts.');
    };

    async stop() {
        await this.connection.close();
        await this.container.stop();
    }

}