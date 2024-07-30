import { getPool, startDatabaseContainer, stopDatabaseContainer } from "../../database/helpers";
import { DatabaseConnection } from "../../database/postgres";
import PlacesRepository from "../places.repository";
import { setupDatabase, tearDownDatabase, closePool } from './helpers';

describe('PlacesRepository', () => {
    let dbConnection: DatabaseConnection;
    let placesRepo: PlacesRepository;


    beforeAll(async () => {
        await startDatabaseContainer();
        await setupDatabase();  // Set up a fresh table before all tests run
        const pool = getPool();
        dbConnection = new DatabaseConnection(pool);
        placesRepo = new PlacesRepository(dbConnection);
    });

    afterAll(async () => {
        await tearDownDatabase(); // Clean up the table after all tests are done
        await closePool();        // Close the pool connection
        await stopDatabaseContainer();

    });

    test('create() should create a places table', async () => {
        await placesRepo.create();
        // Verify the table was created, you can check by attempting to insert and fetch a record, or checking table existence
        const result = await dbConnection.pool.query(`SELECT to_regclass('public.places');`);
        expect(result.rows[0].to_regclass).not.toBeNull();
    });

});
