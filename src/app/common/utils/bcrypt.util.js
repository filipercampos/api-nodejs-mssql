const bcrypt = require('bcryptjs');

module.exports.hash = async function (data) {
  try {
    // Encrypt
    const encrypt = bcrypt.hash(data, 10);
    return encrypt;
  } catch (error) {
    console.log('bcrypt.hash error: ' + error.message);
    throw error;
  }
};

module.exports.compare = async function (text, hash) {
  try {
    // verify
    const validate = await bcrypt.compare(text, hash);
    return validate;
  } catch (error) {
    console.log('bcrypt.compare error: ' + error.message);
    throw error;
  }
};
