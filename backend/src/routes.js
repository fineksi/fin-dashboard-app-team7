const express = require('express');

const Router = express.Router();
// const Sentry = require('@sentry/node');
const ErrorHandlingMiddleware = require('./middlewares/error_handling');
const ApiPartnerSessionMiddleware = require('./middlewares/api_partner_session')
const TimeUtil = require('./utils/time');

const NODE_ENV = process.env.NODE_ENV;

// if (NODE_ENV === 'production') {
//     Sentry.init({
//         dsn: 'xxxxxxx',
//         integrations: [],
//     });
//     Router.use(Sentry.Handlers.requestHandler());
// }

// START LIST ROUTES
// Router.post('/user/login', [], (require('./methods/partner/login').postPartnerLogin));
// Router.post('/user/verify', [ApiPartnerSessionMiddleware], (require('./methods/partner/verify').postPartnerVerify));
// Router.post('/user/logout', [ApiPartnerSessionMiddleware], (require('./methods/partner/logout').postPartnerLogout));
// Router.get('/statement/list', [ApiPartnerSessionMiddleware], (require('./methods/statement/list').getStatementList));
// Router.get('/statement/detail/:uuid', [ApiPartnerSessionMiddleware], (require('./methods/statement/detail').getStatementDetail));

// END OF LIST ROUTES

// Default route section, always put in bottom line.
Router.get('/ping', (_, res) => {
    res.json({
        message: 'OK',
        datetime: TimeUtil.now(),
    });
});
Router.get('/', (_, res) => { res.json({ message: 'Backend is up!' }); });

// // Error logging, always put in bottom line.
// if (NODE_ENV === 'production') {
//     Router.use(Sentry.Handlers.errorHandler());
// }

Router.use(ErrorHandlingMiddleware);

module.exports = Router;
