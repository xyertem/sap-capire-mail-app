namespace sap.capire.mail.app.srv.mailservice;

@path: 'mailservice'
service MailService {
    function triggerMailEvent() returns response;
}

type response : String(20);
