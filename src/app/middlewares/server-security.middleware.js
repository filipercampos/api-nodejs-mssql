'use strict';

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');

module.exports = (app, useHttps = false) => {
  if (useHttps) {
    //only https
    app.use(helmet());
    //use ssl
    // const pathCert = path.join(__dirname, '../../infra/security');
    // const passphrase = 'passphrase';
    // const credentials = {
    //   key: fs.readFileSync(path.join(pathCert, 'cert.key')),
    //   cert: fs.readFileSync(path.join(pathCert, 'cert.crt')),
    //   passphrase: passphrase,
    // };
    // return https.createServer(credentials, app);
    return https.createServer(app);
  } else {
    const server = http.createServer(app);
    return server;
  }
};
