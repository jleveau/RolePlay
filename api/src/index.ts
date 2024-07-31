import express from 'express';
import { DatabaseConnection } from './database/postgres';
import PlacesController from './places/places.controller';
import { attachPlacesRoutes } from './places/places.router';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import attachSwagger from './swagger/swaggerRouter';

dotenv.config();

const start = async () => {

    const app = express();
    
    // Middleware setup
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(cors()); // to enable CORS with various options
    app.use(helmet()); // helps secure your apps by setting various HTTP headers
    app.use(morgan('dev')); // HTTP request logger middleware for node.js
    
    attachSwagger(app);
    attachPlacesRoutes(app);

    app.listen(process.env.PORT, () => {
        console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });

    const databaseConnection = new DatabaseConnection();
    await databaseConnection.connect()

    const placesController = new PlacesController(databaseConnection);
    placesController.init();
}

start()