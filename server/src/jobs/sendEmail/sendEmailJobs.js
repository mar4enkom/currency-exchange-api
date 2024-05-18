const {Worker, Queue} = require("bullmq");
const {v4} = require("uuid");
const {mailer} = require("../../mailer/Mailer");
const {config} = require("../../config/config");
const {SEND_EMAIL_QUEUE_ID, SEND_EMAIL_CREATOR_QUEUE_ID} = require("./constants");
const {subscriptionService} = require("../../modules/subscription/SubscriptionService");

const sendEmailCreatorQueue = new Queue(SEND_EMAIL_CREATOR_QUEUE_ID, config.redisConnection);

const sendEmailWorker = new Worker(SEND_EMAIL_QUEUE_ID, async job => {
    try {
        const {email, subject, text} = job.data;
        await mailer.sendEmail({ to: email, subject, text });
    } catch (e) {
        throw e;
    }
}, config.redisConnection);

const sendEmailCreatorWorker = new Worker(SEND_EMAIL_CREATOR_QUEUE_ID, async job => {
    if(job.data) {
        await subscriptionService.setupNotificationJobs()
    }
}, config.redisConnection);

module.exports = {
    sendEmailCreatorQueue
};

