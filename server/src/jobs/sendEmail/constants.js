const {rateNotificationsCronPattern} = require("nodemon/lib/config");

const SEND_EMAIL_QUEUE_ID = "sendEmail";
const sendEmailJobProps = {
    repeat: {
        pattern: rateNotificationsCronPattern,
    }
}

module.exports = {
    SEND_EMAIL_QUEUE_ID,
    sendEmailJobProps
}