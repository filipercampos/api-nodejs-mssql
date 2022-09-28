const logger = require('./index');
const chalk = require('chalk');
module.exports = class Logger {
  static log(err) {
    logger.log(chalk.green(err));
  }
  static error(err) {
    logger.error(chalk.red(err));
  }
  static trace(err) {
    logger.trace(chalk.gray(err));
  }
  static debug(err) {
    logger.debug(chalk.magenta(err));
  }
  static info(err) {
    logger.info(err);
  }
  static warn(err) {
    logger.warn(chalk.yellowBright(err));
  }
};
