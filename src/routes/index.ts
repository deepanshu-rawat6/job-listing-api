import express from 'express';

import api from './apiRouter';
import authRouter from './authRouter';
import userRouter from './userRouter';
import jobListingRouter from './jobListingRouter';

const router = express.Router();

export default (): express.Router => {
    api(router)
    authRouter(router)
    userRouter(router)
    jobListingRouter(router)

    return router;
}