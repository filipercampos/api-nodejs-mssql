'use strict';
const appConfig = require('./infra/config/app.config');
const express = require('express');
const app = express();
const expressMiddleware = require('./app/middlewares/express.middleware');
const swaggerMiddleware = require('./app/middlewares/swagger.middleware');
const routes = require('./app/routes');
const checkConnection = require('./infra/database/mssql-check-connection');
const apppServer = require('./app/middlewares/server-security.middleware');
const logger = require('./infra/logger/logger');

//check connection (start only connected)
checkConnection().then((_) => {
  //setup middleware app
  expressMiddleware(express, app);

  //swagger
  swaggerMiddleware(app);

  //api routes
  routes(app);

  //create server http/https
  const server = apppServer(app, process.env.ENV === 'production');

  //start app
  server.listen(appConfig.port, () => {
    logger.log(`API running on port ${appConfig.port} | env: ${appConfig.env}`);
  });
});
