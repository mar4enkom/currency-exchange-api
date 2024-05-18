const {config} = require("../../config/config");

const SEND_EMAIL_QUEUE_ID = "sendEmail";
const sendEmailCommonOptions = {
    repeat: {
        pattern: config.rateNotificationsCronPattern,
    }
}

module.exports = {
    SEND_EMAIL_QUEUE_ID,
    sendEmailCommonOptions
}