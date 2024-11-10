
const cds = require('@sap/cds');

const {mailbody} = require('../mailtemplate/mail-body');

const { Mail } = require('./mail');

module.exports = cds.service.impl(async function () {
    this.on('triggerMailEvent', async ( req, res ) => {
        try {
            const mail = new Mail('Sending with SendGrid is Fun',null,mailbody,'ykselertem@yandex.com');
            await mail.sendMail();
            return req.notify(200)
        } catch (error) {
            console.log(error);
            throw error;
        }
        
    })
})