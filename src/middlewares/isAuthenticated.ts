import { Request, Response, NextFunction } from 'express';
import config from '../config';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../helpers';
import { prisma } from '../utils/db';


declare global {
    namespace Express {
        interface Request {
            user?: { id: string, name: string, points: number };
        }
    }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies[config.COOKIE_NAME];

        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "not authorized!"
            });
        }

        const decoded = await verifyToken(token) as { id: string, email: string };

        if (!decoded) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Unauthorized"
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        })

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found!"
            });
        }

        req.user = user;

        return next();
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error"
        });
    }
}