const PartnerRepository = require('../repositories/partner')
const Languages = require('../languages');

module.exports = async (req, res, next) => {
    try {
        if (!req.headers) {
            return res.status(401).json({ message: Languages.FAILED_AUTH_REQUIRED('MDLWR01') });
        }

        const partnerUuid = req.headers.Authorization || req.headers.authorization;
        if (!partnerUuid) {
            return res.status(401).json({ message: Languages.FAILED_AUTH_REQUIRED('MDLWR02') });
        }

        const partner = await PartnerRepository.findByUuid(partnerUuid)
        if (!partner) {
            return res.status(401).json({ message: Languages.FAILED_AUTH_REQUIRED('MDLWR03') });
        }

        // Stores to session.
        req.session = {
            partner,
            partner_uuid: partnerUuid,
        };

        return next();
    } catch (error) {
        return res.status(401).json({ message: Languages.ERROR_INTERNAL_SERVER });
    }
};
