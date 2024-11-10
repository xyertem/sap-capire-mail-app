require('dotenv');
const cds = require('@sap/cds');
const sgMail = require('@sendgrid/mail')
const {mailbody} = require('../mailtemplate/mail-body');

module.exports = cds.service.impl(async function () {
    this.on('triggerMailEvent', async ( req, res ) => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: 'ykselertem@yandex.com', // Change to your recipient
            from: 'yuksel.ertem123@gmail.com', // Change to your verified sender
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: mailbody,
        }
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            });
    })
})