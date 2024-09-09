import { PrismaClient } from '@prisma/client';
import logger from './logger';

const prisma = new PrismaClient({
    log: ["error", "info", "warn", "query"],
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

const connect = async () => {
    await prisma.$connect();
    logger.info('Database connected');
}

export {
    prisma,
    connect
};