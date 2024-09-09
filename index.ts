import App from './src/server';
import http from 'http';
import config from './src/config';
import { logger, swaggerDocs, connect } from './src/utils';

const server = http.createServer(App);

server.listen(config.PORT, () => {

    connect();

    logger.info(`Server is running on port: ${config.PORT}`);

    swaggerDocs(App, config.PORT.toString());
});