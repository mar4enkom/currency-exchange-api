const mongoose = require('mongoose');
const User = require('../user/dataAccess/User');
const {mailer} = require("../../mailer/Mailer");
const {config} = require("../../config");
const {rateService} = require("../rate/RateService");

class SubscriptionService {
    async notifyAll() {
        const users = await User.find({}, 'email');
        const currentRate = await rateService.getUsdToUahRate();

        for (const user of users) {
            try {
                const res = await mailer.sendEmail({
                    to: user.email,
                    subject: config.subscriptionService.subject,
                    text: config.subscriptionService.text(currentRate),
                })
                console.log(res);
            } catch(e) {
                console.log("Err", e);
            }
        }
    }
}

module.exports.subscriptionService = new SubscriptionService();