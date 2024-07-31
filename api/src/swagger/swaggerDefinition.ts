import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition: swaggerJSDoc.SwaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Roleplay API Swagger',
      version: '1.0.0',
      description: 'This a brilliant application to design and play roleplay sessions',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
  };
  
  export default swaggerDefinition;