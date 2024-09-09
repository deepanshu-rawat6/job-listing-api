import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../package.json';
import logger from './logger';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Docs',
            version
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                },
            },
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/routes/*.ts']
}


const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: string) {
    // Swagger page
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


    // Docs in json format
    app.get('/api-docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec)
    });


    logger.info(`Docs available at http://localhost:${port}/api-docs`)
}

export default swaggerDocs;