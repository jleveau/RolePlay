import { DatabaseConnection } from "../database/postgres";
import { Place } from "./places";

export default class PlacesRepository {

    connection: DatabaseConnection;
    placesRepository: PlacesRepository

    constructor(connection: DatabaseConnection) {
        this.connection = connection;
    }
    

    async create() {
        try {
           await this.connection.pool.query(`
            CREATE TABLE IF NOT EXISTS places (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255)
            );
            `);
        } catch (error) {
            console.error("Error creating Places table", error)
        }
    }

    insertPlace = async (place: Place) => {
    
    };
}
