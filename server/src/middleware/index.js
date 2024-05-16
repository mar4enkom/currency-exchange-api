const cors = require("cors");
const {json} = require("express");
const {errorHandlingMiddleware} = require("./errorHandlingMiddleware");
const {notFoundMiddleware} = require("./notFoundMiddleware");

module.exports = {
    errorMiddlewareList: [
        errorHandlingMiddleware,
        notFoundMiddleware,
    ],
    basicMiddlewareList: [
        cors(),
        json()
    ]
}