const {Worker, Queue} = require("bullmq");
const {mailer} = require("../../mailer/Mailer");
const {config} = require("../../config/config");
const {SEND_EMAIL_QUEUE_ID} = require("./constants");

require("./workers");
const sendEmailQueue = new Queue(SEND_EMAIL_QUEUE_ID, config.redisConnection);

module.exports.sendEmailQueue = sendEmailQueue;

