const nodemailer = require('nodemailer');
const sgtransport = require('nodemailer-sendgrid-transport');

const mailer = nodemailer.createTransport(sgtransport({
    auth: {
        api_key: process.env.nodemailerApiKey
    }
}));

module.exports = mailer;
