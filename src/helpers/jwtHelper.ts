import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import config from '../config';
import { Response } from "express";

const createJwt = async (user: User, res: Response) => {
    const token = jwt.sign({
        email: user.name,
        points: user.points,
        id: user.id
    }, config.JWT_SECRET, {
        expiresIn: '7d'
    })

    res.cookie(config.COOKIE_NAME, token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: config.NODE_ENV === 'production' ? true : false,
        domain: config.NODE_ENV === 'production' ? config.UI_ORIGIN : undefined
    })
}

const createJwtWithExpiration = async (user: User) => {
    const token = jwt.sign({
        email: user.name,
        points: user.points,
        id: user.id
    }, config.JWT_SECRET, {
        expiresIn: '1h'
    })

    return token
}

const verifyToken = async (token: string) => {
    return jwt.verify(token, config.JWT_SECRET);
}

export {
    createJwt,
    createJwtWithExpiration,
    verifyToken
}