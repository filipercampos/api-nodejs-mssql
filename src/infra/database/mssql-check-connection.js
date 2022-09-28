'use strict';
const mssql = require('mssql');
const appConfig = require('../config/app.config');
const logger = require('../logger/logger');

module.exports = async function checkConnection(callback) {
  const client = new mssql.ConnectionPool(appConfig.mssqlConfig);
  try {
    // connect the client to the server
    await client.connect();
    if (callback) callback();
    // console.log("Connected successfully to server");
  } catch (err) {
    logger.error(`Fail connect sql server: ${err.message}`);
    throw err;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};
