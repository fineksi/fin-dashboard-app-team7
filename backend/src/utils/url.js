const API_URL = process.env.API_URL;
const API_PREFIX = process.env.API_PREFIX;

const generateApiUrl = (prefix, uuid, key, session) => {
    const partnerApiUrl = `${API_URL}/${API_PREFIX}${prefix}/${uuid}/${key}?token=${session?.partner_token || 'xxx'}`;
    return partnerApiUrl;
};

exports.generateApiUrl = generateApiUrl;

module.exports = exports;
