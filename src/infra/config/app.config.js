const config = require('config');
const AppDataConfig = require('./appdata.config');
//mongo config
const appConfig = new AppDataConfig();
//load config from file
appConfig.load(config);
//export appConfig
module.exports = appConfig;
