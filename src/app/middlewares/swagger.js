const fs = require('fs');
const path = require('path');
const openApiValidator = require('express-openapi-validator');
const jsyaml = require('js-yaml');
const swaggerUI = require('swagger-ui-express');
const swaggerErrorValidator = require('./swaggerErrorValidators');

const authSecurity = require('./auth');

module.exports = (app) => {

    //the Swagger document yaml
    const apiSpec = path.join(__dirname, '../docs/openapi.yaml');
    // require it, build it programmatically, fetch it from a URL, ...)
    const setup = swaggerUI.setup(jsyaml.load(fs.readFileSync(apiSpec, 'utf-8')));

    //Route Swagger Docs 3.0
    app.use('/docs', swaggerUI.serve, setup);

    // Validate Swagger requests
    app.use(
        openApiValidator.middleware({
            apiSpec: apiSpec,
            validateRequests: true,
            validateResponses: false,
            validateSecurity: {
                handlers: {
                    ApiKeyAuth: authSecurity.verifyApiKey
                }
            }
        })
    );

    //validate swagger error
    app.use(swaggerErrorValidator);
} 
