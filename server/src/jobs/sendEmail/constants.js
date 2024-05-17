const SEND_EMAIL_QUEUE_ID = "sendEmail";
const sendEmailJobProps = {
    repeat: {
        every: 10000,
    }
}

module.exports = {
    SEND_EMAIL_QUEUE_ID,
    sendEmailJobProps
}