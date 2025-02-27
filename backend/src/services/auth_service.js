const AuthRepository = require("../repositories/partner.js");

exports.login = async (email, password) => {
    const data = await AuthRepository.findById(email);
    return data;
}

module.exports = exports;
