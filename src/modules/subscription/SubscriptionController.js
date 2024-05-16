const { z } = require("zod");

const emailSchema = z.string().email();

class SubscriptionController {
    async create(req, res, next) {
        try {
            const { email } = req.body;
            const validationResult = emailSchema.safeParse(email);

            if (!validationResult.success) {
                return res.status(409).json({ error: "Invalid email address" });
            }

            return res.status(200).json({ message: "Subscription created successfully" });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    subscriptionController: new SubscriptionController()
};
