import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../utils/logger';
import { prisma } from '../utils';
import config from '../config';
import { createJwt, comparePassword } from '../helpers';

export const registerUser = async (req: Request, res: Response) => {

    try {
        const { name, username, password, githubLink } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        if (existingUser) {
            logger.info("User already exists");
            res.status(StatusCodes.CONFLICT).json({
                message: "User already exists"
            }).end();
        }

        const user = await prisma.user.create({
            data: {
                name: name,
                username: username,
                password: password,
                githubLink: githubLink,
            }
        });

        if (user) {
            await createJwt(user, res);

            res.status(StatusCodes.OK).json({
                message: "User registered successfully",
            });
        } else {
            logger.info("Error in creating user");
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Internal Server Error"
            }).end();
        }
    } catch (err) {
        logger.error(`Error in registering user ${err}`, { error: err, stack: err.stack });
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error"
        }).end();
        return;
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body

        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found"
            }).end();

            return;
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Invalid credentials"
            });

            return;
        }

        await createJwt(user, res);

        res.status(StatusCodes.OK).json({
            message: "User logged in successfully",
        });
    } catch (err) {
        logger.error("Error in loginUser", err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error"
        });
        return;
    }
}

export const logoutUser = async (req: Request, res: Response) => {
    try {
        res.cookie(config.COOKIE_NAME, '', { maxAge: 0 });
        res.clearCookie(config.COOKIE_NAME);
        res.status(StatusCodes.OK).json({
            message: "Logged out successfully"
        })
    } catch (err) {
        logger.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message).end();
    }
}
