// src/server.ts or where you setup your express app

import * as Express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerSetup';



const attachSwagger = (app: Express.Application) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export default attachSwagger;

