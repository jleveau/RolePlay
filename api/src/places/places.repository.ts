import { DatabaseConnection } from "../database/postgres";
import { Place } from "./places";

export default class PlacesRepository {

    connection: DatabaseConnection;
    placesRepository: PlacesRepository

    constructor(connection: DatabaseConnection) {
        this.connection = connection;
    }
    
    async clear() {
        try {
           await this.connection.client.query('DROP TABLE IF EXISTS places;');
           console.info("Cleared Places Tables")
        } catch (error) {
            console.error("Error while dropping table places", error);
        }
    };

    async create() {
        try {
           await this.connection.client.query(`
            CREATE TABLE IF NOT EXISTS places (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255)
            );
            `);
            console.info("Created Table Places")
        } catch (error) {
            console.error("Error creating Places table", error)
        } finally {
            this.connection.client.release()
        }
    }

    insertPlace = async (place: Place) => {
    
    };
}
