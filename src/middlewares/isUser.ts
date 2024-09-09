import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../utils/logger';
import { prisma } from '../utils';

export const isUser = async (req: Request, res: Response, next: any) => {
    try {
        const userId = req.user.id;

        const { id } = req.params;

        const user = await prisma.user.findFirst({
            where: {
                id: id,
            }
        });

        if (!user) {
            logger.info('User not found');
            res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found"
            }).end();
            return;
        }

        if (user.id !== userId) {
            logger.info('Unauthorized');
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Unauthorized"
            }).end();
            return;
        }

        next();
    } catch (err) {
        logger.error(`Error in isUser: ${err}`, { error: err, stack: err.stack });
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: "Internal server error"
        }).end();
        return;
    }
}