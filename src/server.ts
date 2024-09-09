import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import router from './routes';
import { StatusCodes } from 'http-status-codes';
import { logger } from './utils';

const app = express();

app.use(helmet());
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(compression());

app.use('/api/v1', router());

app.get('/', (req, res) => {
    logger.info('Welcome to the Job Listing API');
    res.status(StatusCodes.OK).json({
        message: "Welcome to the Job Listing API"
    })
})

export default app;