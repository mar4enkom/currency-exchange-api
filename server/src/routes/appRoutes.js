const appRoutes = require('express').Router();

const {rateRoutes} = require("../modules/rate/routes");
const {Endpoints} = require("../shared/constants/constants");
const {subscriptionRoutes} = require("../modules/subscription/routes");

appRoutes.use(rateRoutes);
appRoutes.use(subscriptionRoutes);

module.exports = appRoutes;
