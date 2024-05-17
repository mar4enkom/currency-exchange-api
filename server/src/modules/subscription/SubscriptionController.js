const { z } = require("zod");
const mongoose = require('mongoose');
const User = require('../user/dataAccess/User');

const emailSchema = z.string().email();

class SubscriptionController {
    async create(req, res, next) {
        try {
            const { email } = req.body;

            const validationResult = emailSchema.safeParse(email);
            if (!validationResult.success) {
                return res.status(409).json("Invalid email address");
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json("Email already exists");
            }

            const newUser = new User({ email });
            await newUser.save();

            return res.status(200).json("E-mail додано");
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    subscriptionController: new SubscriptionController()
};
