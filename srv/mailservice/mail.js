require('dotenv');
const {readCredential,readCredentialValue,writeCredential,deleteCredential } = require('../lib/credStrore');
const sgMail = require('@sendgrid/mail')
const xsenv = require('@sap/xsenv');
xsenv.loadEnv();

class Mail {
    
    constructor(subject,mailbody,mailbodyDatas,toRecipient){
        this.subject = subject;
        this.mailbody = mailbody;
        this.mailbodyDatas = mailbodyDatas;
        this.toRecipient = toRecipient;
    }

    async sendMail(){
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: this.toRecipient, // Change to your recipient
            from: 'yuksel.ertem123@gmail.com', // Change to your verified sender
            subject: this.subject,
            text: 'and easy to do anywhere, even with Node.js',
            html: this.mailbody,
        }
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            });
    }

    async
}

module.exports = {
    Mail
}