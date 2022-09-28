const fs = require('fs');
const path = require('path');
const openApiValidator = require('express-openapi-validator');
const jsyaml = require('js-yaml');
const swaggerUI = require('swagger-ui-express');
const verifyApiKey = require('./auth.middleware').verifyApiKey;
const handleErrorMiddleware = require('./handler-error.middleware');
const config = require('config');

module.exports = (app) => {
  //the Swagger document yaml
  const apiSpec = _generateServerSwaggerDocs();
  // require it, build it programmatically, fetch it from a URL, ...)
  const setup = swaggerUI.setup(jsyaml.load(fs.readFileSync(apiSpec, 'utf-8')));
  //Route Swagger Docs 3.0
  app.use('/docs', swaggerUI.serve, setup);
  // Validate Swagger requests
  app.use(
    openApiValidator.middleware({
      apiSpec: apiSpec,
      validateRequests: false,
      validateResponses: false,
      validateSecurity: {
        handlers: {
          ApiKeyAuth: verifyApiKey,
        },
      },
    })
  );
  //handle api error
  app.use(handleErrorMiddleware);
};

/**
 * Generate swagger docs based on environment settings
 *
 * Swagger server url
 *
 * @returns {string} Swagger file
 */
function _generateServerSwaggerDocs() {
  //swagger docs base
  const swaggerBase = path.join(__dirname, `../docs/swagger.yaml`);
  //swagger docs generate
  const apiSpec = path.join(__dirname, `../docs/swagger-docs.yaml`);
  //read swagger doc base
  const data = fs.readFileSync(swaggerBase, 'utf-8');
  //ensure swagger file
  if (fs.existsSync(apiSpec)) {
    fs.unlinkSync(apiSpec);
  }
  //env
  const envName = upperFirstLetter(config.get('ENV'));
  //server config env
  const server = config.get('SERVER.HOST');
  const apiServer = `${server}
    description: ${envName} Server`;
  //generate swagger server
  const result = data.replace('$api_server_url', apiServer);
  //write changes
  fs.writeFileSync(apiSpec, result);
  //get swagger file
  return apiSpec;
}
function upperFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
