const ConfigUtil = require('../utils/config');

const logErrorSlackNotification = async ({
    req, err,
}) => {
    try {
        const paramsText = req.params && Object.keys(req.params).length > 0 ? `
> *Params*:
> \`\`\`${JSON.stringify(req.params, null, 1)}\`\`\`` : '';
        const queryText = req.query && Object.keys(req.query).length > 0 ? `
> *Query*:
> \`\`\`${JSON.stringify(req.query, null, 1)}\`\`\`` : '';
        const bodyText = req.body && Object.keys(req.body).length > 0 ? `
> *Body*:
> \`\`\`${JSON.stringify(req.body, null, 1)}\`\`\`` : '';
        const blocks = [
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: ':x::warning::no_entry: ERROR UNHANDLED EXCEPTION :no_entry::x::warning:',
                    emoji: true,
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `> *Message*: ${err.message || ''}
> \`\`\`${err.stack?.split('\n')?.[1] || ''}\`\`\`
> *Url*: ${req.protocol}://${req.get('host')}${req.originalUrl}${paramsText}${queryText}${bodyText}`,
                },
            },
        ];
        
        // eslint-disable-next-line no-undef
        await CommonLambdaUtil.slackNotification({
            channel: ConfigUtil.SLACK_BANK_STATEMENT_LOG_CID,
            blocks,
        });
    } catch (_) {
        // Ignores.
    }
};

module.exports = (err, req, res, next) => {
    try {
        logErrorSlackNotification({ req, err });
        console.error(err.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    } catch (error) {
        return next();
    }
};
