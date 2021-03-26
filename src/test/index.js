'use strict';
const config = require('config');
const http = require('http');
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const chalk = require('chalk');
const logger = require('tracer').colorConsole();
const middleware = require('../app/middlewares/middlewares');
const server = http.createServer(middleware);

const port = config.get('TEST').PORT;
const host = config.get('TEST').HOST;
const enviroment = config.get('ENV');

server.listen(port, async () => {
    logger.info(`API TEST running: ${host}:${port} enviroment: ${enviroment}`);
});

chai.should();
chai.use(chaiHttp);

function verifyStatusError(res) {
    const status = res.status;
    const error = status >= 400 || status <= 500;
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
    verifyStatusError
}