const cryptoUtil = require('../../src/app/common/utils/crypto.util');

const data = '1234';
let e = cryptoUtil.encrypt(data);
console.log('Encrytp:', e);

let d = cryptoUtil.decrypted(e);
console.log('Decrypted:', d);

//result
const flutterEncryped = 'U2FsdGVkX19J2cZ8hrI8tIQzqvKETxF+rhlR8eOM2+I=';
console.log('Request Decrypted:', cryptoUtil.decrypted(flutterEncryped));
