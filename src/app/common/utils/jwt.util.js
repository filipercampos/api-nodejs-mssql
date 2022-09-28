'use strict';

const jwt = require('jsonwebtoken');
const cert = require('../../../infra/config/auth.json');

module.exports = class JwtUtil {
  static sign(data, exp) {
    return new Promise(function (resolve, reject) {
      // expiration 1d
      // data.expiresIn = 86400;
      jwt.sign(
        { data },
        cert.secret,
        { expiresIn: exp || '1d' },
        function (err, token) {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });
  }

  static verify(token, secretOrPublicKey, callback) {
    try {
      const decoded = jwt.verify(token, secretOrPublicKey, callback);
      return decoded;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  }

  static decode(token) {
    try {
      const decoded = jwt.decode(token);
      return decoded;
    } catch (err) {
      return null;
    }
  }
};
