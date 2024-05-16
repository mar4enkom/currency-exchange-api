const express = require("express");
const {rateController} = require("./RateController");
const {Endpoints} = require("../../shared/constants/constants");

const rateRoutes = express.Router();

rateRoutes.route(Endpoints.RATE).get(rateController.getRate);

module.exports = {
    rateRoutes
};
