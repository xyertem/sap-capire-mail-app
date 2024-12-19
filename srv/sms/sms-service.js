require('dotenv');
// const cds = require('@sap/cds');

// const twilio = require("twilio");

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = twilio(accountSid, authToken);
// const sender = process.env.FROM_PHONE;
// const reciever = process.env.TO_PHONE;

// module.exports = cds.service.impl(async function(){

//     this.on('createSms', async (req, res) => {
//         try {
//             const message = await client.messages.create({
//                 body: "Yükselin CAP uygulaması tarafından geldi :)",
//                 from: sender,
//                 to: reciever,
//               });
//               console.log(message.body);
//         } catch (error) {
//             console.log(error);
//         }
       
//     })
// })