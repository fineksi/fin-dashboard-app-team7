const AuthRepository = require("../repositories/partner.js");
exports.login = async (email) => {
  const data = await AuthRepository.findById(email);
  return data;
};

module.exports = exports;
