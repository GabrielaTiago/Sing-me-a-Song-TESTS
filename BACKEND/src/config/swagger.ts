import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sing Me A Song API',
      version: '1.0.0',
      description: 'API for managing song recommendations',
      contact: {
        name: 'Gabriela Tiago',
        email: 'gabrielatiagodearujo@outlook.com',
        url: 'https://github.com/GabrielTiago',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Recommendations',
      },
    ],
    components: {
      schemas: {
        Recommendation: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            name: {
              type: 'string',
              example: 'Song Name',
            },
            youtubeLink: {
              type: 'string',
              example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            },
            score: {
              type: 'integer',
              example: 10,
            },
          },
        },
        NewRecommendation: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Song Name',
            },
            youtubeLink: {
              type: 'string',
              example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            },
          },
          required: ['name', 'youtubeLink'],
        },
      },
    },
  },
  apis: ['./src/routers/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
