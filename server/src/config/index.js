module.exports = {
    config: {
        subscriptionService: {
            subject: "Rate updates",
            text: (rate) => `Current USD - UAH rate is ${rate}`,
        }
    }
}