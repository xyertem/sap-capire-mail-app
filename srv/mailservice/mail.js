require('dotenv');
const { readCredential,readCredentialValue,writeCredential,deleteCredential } = require('../lib/credStrore');
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
        try {
            const testItem = {
                name: "password1",
                value: "myVerySecretMessage",
                username: "user1",
                metadata: "if you see this text, the cred store is working :)"
              };
            //https://credstore.cfapps.ap10.hana.ondemand.com/api/v1/credentials/password=name=testItem
            //const writeRes = await writeCredential("sap.cap.mail.app.sendgrid", "password", testItem);
            const SENDGRID_API_KEY = await readCredential("sap.cap.mail.app.sendgrid","password","sendgridmailapikey");
            console.log(SENDGRID_API_KEY);
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
        } catch (error) {
            console.log(error);
        }
       
    }

}

module.exports = {
    Mail
}