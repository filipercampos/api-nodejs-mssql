'use strict';
const config = require('config');
const http = require('http');
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const chalk = require('chalk');
const logger = require('tracer').colorConsole();
const express = require('express');
const app = express();
const expressMiddleware = require('../src//app/middlewares/express.middleware');
const swaggerMiddleware = require('../src//app/middlewares/swagger.middleware');
const routes = require('../src/app/routes');
//setup middleware app
expressMiddleware(express, app);

//swagger
swaggerMiddleware(app);

//api routes
routes(app);

const server = http.createServer(app);

const port = config.get('TEST').PORT;
const host = config.get('TEST').HOST;
const enviroment = config.get('ENV');

server.listen(port, async () => {
  logger.info(`API TEST running: ${host}:${port} enviroment: ${enviroment}`);
});

chai.should();
chai.use(chaiHttp);

function handleStatusError(res) {
  const status = res.status;
  const error = status >= 300 && status <= 500;
  if (error === true) {
    console.log(chalk.red('\t' + res.body.data.message));
  }
  return error;
}

module.exports = {
  server,
  chai,
  assert,
  chalk,
  handleStatusError,
};
