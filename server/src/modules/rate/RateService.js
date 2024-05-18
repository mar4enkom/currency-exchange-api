const {get} = require("axios");

class RateService {
    async getUsdToUahRate() {
        try {
            const response = await get(`${process.env.PRIVAT_BANK_API}?json&exchange&coursid=5`);
            const usdToUahRate = response.data?.find(rate => rate.ccy === "USD")?.buy;
            const result = parseFloat(usdToUahRate);

            if(usdToUahRate == null || isNaN(result)) {
                throw new Error("Invalid value from api");
            }

            return result;
        } catch (error) {
            throw new Error("Failed to fetch USD to UAH exchange rate");
        }
    }
}

module.exports = {
    rateService: new RateService()
}