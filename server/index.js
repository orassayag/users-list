const environment = process.env.NODE_ENV || 'development';
const config = require(`./config/config.${environment}.json`);
const winston = require('winston');
const express = require('express');
const app = express();

// Listen to the express.
const portExpressServer = process.env.PORT_EXPRESS_SERVER || config.PORT_EXPRESS_SERVER;
require('./startup/logging')();
require('./startup/routes')(app);

// Listen to the express.
const server = app.listen(portExpressServer, () => {
    winston.info(`Listening to express server port ${portExpressServer}...`);
    winston.info(`Server on ${environment} environment...`);
});

require('./startup/websocket')(server, app);

module.exports = server;