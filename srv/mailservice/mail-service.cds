//namespace sap.capire.mail.app.srv;

@path: 'mailservice'
service MailService {
    function triggerMailEvent() returns response;
}

type response : String(20);
