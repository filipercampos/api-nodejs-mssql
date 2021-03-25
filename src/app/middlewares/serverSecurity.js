'use strict'

const https = require('https');
const http = require('http');
const fs = require('fs');

module.exports = (app, useHttps = false) => {
    if (useHttps) {
        const privateKey = fs.readFileSync('config/cert.key', 'utf8');
        const certificate = fs.readFileSync('config/cert.crt', 'utf8');
        const credentials = { key: privateKey, cert: certificate };
        const server = https.createServer(credentials, app);
        return server;
    }
    else {
        const server = http.createServer(app);
        return server;

    }
}
