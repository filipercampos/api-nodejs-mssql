'use strict'

const https = require('https');
const http = require('http');
const fs = require('fs');

module.exports = (app, useHttps = false) => {
    if (useHttps) {
        const privateKey = fs.readFileSync(path.join(__dirname, '../../config/cert.key'));
        const certificate = fs.readFileSync(path.join(__dirname, '../../config/cert.crt'));
        const credentials = { key: privateKey, cert: certificate };
        const server = https.createServer(credentials, app);
        return server;
    }
    else {
        const server = http.createServer(app);
        return server;

    }
}
