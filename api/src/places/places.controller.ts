import { DatabaseConnection } from "../database/postgres"
import PlacesRepository from "./places.repository";

export default class PlacesController {

    private repository: PlacesRepository;

    constructor(databaseConnection: DatabaseConnection) {
        this.repository = new PlacesRepository(databaseConnection);
    }

    async init() {
        try {
            await this.repository.create()
        } catch(error) {
            console.error("Failed to create Places Repository", error)
        }
    }

}