const mongoose = require('mongoose');
const User = require('../user/dataAccess/User');
const {mailer} = require("../../mailer/Mailer");
const {rateService} = require("../rate/RateService");
const {sendEmailQueue} = require("../../jobs/sendEmail/queues");
const {sendEmailCommonOptions, SEND_EMAIL_QUEUE_ID} = require("../../jobs/sendEmail/constants");

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
                const jobOptions = {...sendEmailCommonOptions, jobId: user.email };
                await sendEmailQueue.add(SEND_EMAIL_QUEUE_ID, data, jobOptions);
            } catch(e) {
                throw e;
            }
        }
    }
}

module.exports.subscriptionService = new SubscriptionService();