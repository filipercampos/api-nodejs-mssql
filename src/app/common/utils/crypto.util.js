const CryptoJS = require('crypto-js');
//string secret key
const secretKey = require('../../../infra/config/auth.json').secret;

module.exports.encrypt = function (data) {
  if (!data || data == null) {
    return null;
  }
  try {
    const jsonOrData = typeof data === 'object' ? JSON.stringify(data) : data;
    // Encrypt
    const encrypt = CryptoJS.AES.encrypt(jsonOrData, secretKey, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypt.toString();
  } catch (error) {
    console.log('encrypt: ' + error.message);
  }
};

module.exports.decrypted = function (encryptText) {
  if (!encryptText || encryptText == null) {
    return null;
  }
  try {
    // decrypt
    const bytes = CryptoJS.AES.decrypt(encryptText, secretKey, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  } catch (error) {
    console.log('decrypted: ' + error.message);
    return null;
  }
};
