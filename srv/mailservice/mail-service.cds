namespace sap.capire.mail.app.mailservice;

@path: 'mailservice'
service MailService {
    function triggerMailEvent() returns response;
}

type response : String(20);
