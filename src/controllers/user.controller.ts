import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../utils/logger';
import { prisma } from '../utils';

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
        if (user) {
            logger.info('User details fetched');
            res.status(StatusCodes.OK).send({
                user,
                message: 'User details fetched'
            })
        } else {
            logger.error('User not found');
            res.status(StatusCodes.NOT_FOUND).send({
                message: 'User not found'
            })
        }
    } catch (err) {
        logger.error(`Error in postUserDetails: ${err}`, { error: err, stack: err.stack });
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: "Internal server error"
        }).end();
        return;
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, githubLink } = req.body;

        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name,
                githubLink
            }
        })

        if (user) {
            logger.info('User details updated');
            res.status(StatusCodes.OK).send({
                user,
                message: 'User details updated'
            })
        } else {
            logger.error('User not found');
            res.status(StatusCodes.NOT_FOUND).send({
                message: 'User not found'
            })
        }
    } catch (err) {
        logger.error(`Error in updateUserDetails: ${err}`, { error: err, stack: err.stack });
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: "Internal server error"
        }).end();
        return;
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.delete({
            where: {
                id: id
            }
        })

        if (user) {
            logger.info('User deleted');
            res.status(StatusCodes.OK).send({
                message: 'User deleted'
            })
        } else {
            logger.error('User not found');
            res.status(StatusCodes.NOT_FOUND).send({
                message: 'User not found'
            })
        }
    } catch (err) {
        logger.error(`Error in deleteUser: ${err}`, { error: err, stack: err.stack });
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: "Internal server error"
        }).end();
        return;
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();

        if (users) {
            logger.info('Users fetched');
            res.status(StatusCodes.OK).send({
                users,
                message: 'Users fetched'
            })
        } else {
            logger.error('Users not found');
            res.status(StatusCodes.NOT_FOUND).send({
                message: 'Users not found'
            })
        }
    } catch (err) {
        logger.error(`Error in getUsers: ${err}`, { error: err, stack: err.stack });
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: "Internal server error"
        }).end();
        return;
    }
}

export const userBasedOnPoints = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                points: 'desc'
            }
        });

        // OR : const users = await prisma.user.findMany({});
        // users.sort((a, b) => b.points - a.points);

        if (users) {
            logger.info('Users fetched based on points');
            res.status(StatusCodes.OK).send({
                users,
                message: 'Users fetched based on points'
            })
        } else {
            logger.error('Users not found');
            res.status(StatusCodes.NOT_FOUND).send({
                message: 'Users not found'
            })
        }
    } catch (err) {
        logger.error(`Error in userBasedOnPoints: ${err}`, { error: err, stack: err.stack });
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: "Internal server error"
        }).end();
        return;
    }
}

export const likeUser = async (req: Request, res: Response) => {
    try {
        const { otherUserId } = req.body;
        const userId = req.user.id;

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            logger.error('User not found');
            res.status(StatusCodes.NOT_FOUND).send({
                message: 'User not found'
            });
            return;
        }

        const otherUser = await prisma.user.findUnique({
            where: {
                id: otherUserId
            }
        })

        if (!otherUser) {
            logger.error('Other user not found');
            res.status(StatusCodes.NOT_FOUND).send({
                message: 'Other user not found'
            });
            return;
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            }, data: {
                points: user.points + 100,
                likedUsers: {
                    push: otherUserId
                }
            }
        })

        if (updatedUser) {
            logger.info('User liked');
            res.status(StatusCodes.OK).send({
                message: 'User liked'
            })
        } else {
            logger.error('User not found');
            res.status(StatusCodes.NOT_FOUND).send({
                message: 'User not found'
            });
        }
    } catch (err) {
        logger.error(`Error in likeUser: ${err}`, { error: err, stack: err.stack });
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: "Internal server error"
        }).end();
        return;
    }
}