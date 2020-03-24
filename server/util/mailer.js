const nodemailer = require('nodemailer');
const sgtransport = require('nodemailer-sendgrid-transport');

const { nodemailerApiKey } = require('../config/environment');

const mailer = nodemailer.createTransport(sgtransport({
    auth: {
        api_key: nodemailerApiKey
    }
}));

module.exports = mailer;
