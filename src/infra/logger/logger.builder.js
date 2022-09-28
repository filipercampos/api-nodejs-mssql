const logger = require('./index');
const chalk = require('chalk');

module.exports = class LoggerBuilder {
  constructor(classObj) {
    this._className =
      classObj && classObj.constructor.name ? classObj.constructor.name : null;

    if (!this._className) {
      throw new Error('Class object required at LoggerBuilder');
    }
  }

  log(err) {
    logger.log(chalk.green(`${this._className}.${err}`));
  }
  error(err) {
    logger.error(chalk.red(`${this._className}.${err}`));
  }
  trace(err) {
    logger.trace(chalk.gray(`${this._className}.${err}`));
  }
  debug(err) {
    logger.debug(chalk.magenta(`${this._className}.${err}`));
  }
  info(err) {
    logger.info(err);
  }
  warn(err) {
    logger.warn(chalk.yellowBright(`${this._className}.${err}`));
  }
};
