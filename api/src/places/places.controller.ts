import { DatabaseConnection } from "../database/postgres"
import PlacesRepository from "./places.repository";

export default class PlacesController {

    private databaseConnection: DatabaseConnection;
    private repository: PlacesRepository;

    constructor(databaseConnection: DatabaseConnection) {
        this.databaseConnection = databaseConnection;
        this.repository = new PlacesRepository(this.databaseConnection);
    }

    async init() {
        try {
            this.databaseConnection.connect();         
            console.log("Connected to database")
            
        } catch (error) {
            console.error("Connection to database failed", error)
        }

        try {
            await this.repository.create()
        } catch(error) {
            console.error("Failed to create Places Repository", error)
        }
    }

}