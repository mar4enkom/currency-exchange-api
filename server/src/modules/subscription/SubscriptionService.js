const mongoose = require('mongoose');
const User = require('../user/dataAccess/User');
const {mailer} = require("../../mailer/Mailer");
const {rateService} = require("../rate/RateService");

class SubscriptionService {
    async notifyAll() {
        const users = await User.find({}, 'email');
        const currentRate = await rateService.getUsdToUahRate();

        for (const user of users) {
            try {
                const res = await mailer.sendEmail({
                    to: user.email,
                    subject: "Rate updates",
                    text: `Current USD - UAH rate is ${currentRate}`,
                })
                console.log(res);
            } catch(e) {
                console.log("Err", e);
            }
        }
    }
}

module.exports.subscriptionService = new SubscriptionService();