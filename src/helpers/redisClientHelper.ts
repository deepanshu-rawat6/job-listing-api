import Redis from 'ioredis';
import config from '../config';
import logger from '../utils/logger';
import RedisStore from 'connect-redis';

const redisClient = new Redis({
    host: config.REDIS_HOST,
    port: parseInt(config.REDIS_PORT),
    password: config.REDIS_PASSWORD,
})

redisClient.on('connect', () => {
    logger.info('Redis client connected');
});

redisClient.on('error', (err) => {
    logger.error(`Redis error: ${err.message}`);
});

redisClient.connect().catch((err) => {
    logger.error(`Redis error: ${err.message}`);
});

const redisStore = new RedisStore({
    client: redisClient,
    prefix: "ihs"
})

export default redisStore;