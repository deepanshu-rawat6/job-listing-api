import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../utils/logger';
import { prisma } from '../utils';

export const isOwner = async (req: Request, res: Response, next: any) => {
    try {
        const userId = req.user.id;

        const { jobId } = req.params;

        const jobOwner = await prisma.jobListing.findFirst({
            where: {
                id: jobId,
            }
        });

        if (!jobOwner) {
            logger.info('Job not found');
            res.status(StatusCodes.NOT_FOUND).json({
                message: "Job not found"
            }).end();
            return;
        }

        if (jobOwner.owner !== userId) {
            logger.info('Unauthorized');
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Unauthorized"
            }).end();
            return;
        }

        next();
    } catch (err) {
        logger.error(`Error in isOwner: ${err}`, { error: err, stack: err.stack });
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: "Internal server error"
        }).end();
        return;
    }
}