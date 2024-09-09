import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import router from './routes';
import { StatusCodes } from 'http-status-codes';

const app = express();

app.use(helmet());
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(compression());

app.use('/', router());

app.get('/', (req, res) => {
    res.status(StatusCodes.OK).json({
        message: "Welcome to the Menu Management API"
    })
})

export default app;