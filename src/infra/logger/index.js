'use strict';
const fs = require('fs');
const path = require('path');
const config = require('config');
const chalk = require('chalk');
const { FileUtil } = require('../../app/common/utils');
const dateUtil = require('../../app/common/utils/date.util');

const logger = require('tracer').console({
  format: '[{{timestamp}}]<{{title}}> {{message}} (in {{file}}:{{line}})',
  dateformat: 'yyyy-mm-dd HH:MM:ss',
  preprocess: function (data) {
    data.title = data.title.toUpperCase();
  },
  transport: function (data) {
    if (config.get('ENV') === 'production') {
      const dir = path.join(__dirname, '../../../logs');
      if (!FileUtil.existsPath(dir)) {
        FileUtil.createFolder(dir);
      }
      const fileName = dateUtil.dateFormat(new Date(), 'yyyy-mm-dd-HH-mm');
      fs.createWriteStream(path.join(dir, `./${fileName}.txt`), {
        flags: 'a',
        encoding: 'utf8',
      }).write(data.rawoutput + '\n');
    }
    console.log(chalk.yellow(data.output));
  },
});

module.exports = logger;
