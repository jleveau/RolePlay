import { DatabaseContainer } from "../database/helpers";
import { DatabaseConnection } from "../database/postgres";
import PlacesRepository from "./places.repository";

jest.setTimeout(30000)

describe('PlacesRepository', () => {
    let dbConnection: DatabaseConnection;
    let placesRepo: PlacesRepository;
    let container: DatabaseContainer;


    beforeAll(async () => {
        container = new DatabaseContainer();
        await container.start();
        dbConnection = container.connection;

        placesRepo = new PlacesRepository(dbConnection);
        await placesRepo.clear();
    });

    afterAll(async () => {
        await placesRepo.clear();
        await container.stop();
    });

    test('create() should create a places table', async () => {
        await placesRepo.create();
        const result = await dbConnection.client.query(`SELECT to_regclass('public.places');`);
        expect(result.rows[0].to_regclass).not.toBeNull();
    });

});
