const mongoose = require('mongoose');
const {v4} = require("uuid");
const User = require('../user/dataAccess/User');
const {mailer} = require("../../mailer/Mailer");
const {rateService} = require("../rate/RateService");
const {SEND_EMAIL_QUEUE_ID} = require("../../jobs/sendEmail/constants");
const {Queue} = require("bullmq");
const {config} = require("../../config/config");

const sendEmailQueue = new Queue(SEND_EMAIL_QUEUE_ID, config.redisConnection);

class SubscriptionService {
    async setupNotificationJobs() {
        const users = await User.find({}, 'email');
        const currentRate = await rateService.getUsdToUahRate();

        for (const user of users) {
            try {
                const data = {
                    email: user.email,
                    subject: "Rate updates",
                    text: `Current USD - UAH rate is ${currentRate}`,
                }
                await sendEmailQueue.add(SEND_EMAIL_QUEUE_ID, data, { jobId: user.email });
            } catch(e) {
                throw e;
            }
        }
    }
}

module.exports.subscriptionService = new SubscriptionService();