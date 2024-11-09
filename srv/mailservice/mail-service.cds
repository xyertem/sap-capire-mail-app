namespace srv.mailservice;

@path: 'mailservice'
service MailService {
    function triggerMailEvent() returns response;
}

type response : String(20);
