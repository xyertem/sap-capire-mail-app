
service SmsService {
    function createSms() returns Response;
}

type Response: String;