const {rateService} = require("./RateService");

class RateController {
    async getRate(req, res, next) {
        try {
            const rate = await rateService.getUsdToUahRate();
            res.status(400).json(rate);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    rateController: new RateController()
}