
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDefinition from './swaggerDefinition';

const options: swaggerJsdoc.Options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['**/*.router.ts'],
  
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
