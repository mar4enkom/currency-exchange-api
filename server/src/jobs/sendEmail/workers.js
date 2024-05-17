const {Worker} = require("bullmq");
const {mailer} = require("../../mailer/Mailer");
const {config} = require("../../config/config");
const {SEND_EMAIL_QUEUE_ID} = require("./constants");

const sendEmailWorker = new Worker(SEND_EMAIL_QUEUE_ID, async job => {
    try {
        const {email, subject, text} = job.data;
        await mailer.sendEmail({ to: email, subject, text });
    } catch (e) {
        throw e;
    }
}, config.redisConnection);

module.exports.sendEmailWorker = sendEmailWorker;