const express = require("express");
const {Endpoints} = require("../../shared/constants/constants");
const {subscriptionController} = require("./SubscriptionController");

const subscriptionRoutes = express.Router();

subscriptionRoutes.route(Endpoints.SUBSCRIBE).post(subscriptionController.create);

module.exports = {
    subscriptionRoutes
};
