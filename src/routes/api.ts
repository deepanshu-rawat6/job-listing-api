import express, { Request, Response } from 'express';
import logger from '../utils/logger';

export default (router: express.Router) => {

    /**
     * @openapi
     * '/api/v1/healthcheck':
     *   get:
     *     tags:
     *       - API
     *     summary: Health Check
     *     description: Responds with a simple message indicating if the app is up and running.
     *     responses:
     *       200:
     *         description: App is up and running
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: The health check response message
     *                   example: "Healthcheck OK!"
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: The error message
     *                   example: "Internal server error"
     */
    router.get('/api/v1/healthcheck', (req: Request, res: Response) => {
        logger.info('GET /api/v1/healthcheck');
        res.status(200).send({
            message: "Healthcheck OK!"
        });
    });

    /**
     * @openapi
     * '/api/v1/hello':
     *   get:
     *     tags:
     *       - API
     *     summary: Hello, from server!
     *     description: Responds with a simple "Hello World!" message.
     *     responses:
     *       200:
     *         description: Successfully returns a hello world message
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: The hello world message
     *                   example: "Hello World!"
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: The error message
     *                   example: "Internal server error"
     */
    router.get('/api/v1/hello', (req: Request, res: Response) => {
        logger.info('GET /api/v1/hello');
        res.status(200).send({
            message: "Hello World!"
        });
    });
}