'use strict'

const config = require('config');
const app = require('./src/app/middlewares/middlewares');

const MssqlFactory = require('./src/infrastructure/database/mssqlFactory');

//check connection and start
MssqlFactory.checkConnection(start);

//start app
async function start(conn) {

    //create server http/https
    const server = require('./src/app/middlewares/serverSecurity')(app, false);

    const port = config.get('SERVER').PORT;
    const db = config.get('DB').MSSQL.DATABASE;
    const enviroment = config.get('ENV');

    server.listen(port, () => {
        console.log(`API running on Port ${port} | Enviroment: ${enviroment} | Database: ${db}`);
    });

}