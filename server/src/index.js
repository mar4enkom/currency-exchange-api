const express = require("express");
const mongoose = require('mongoose');
const {basicMiddlewareList, errorMiddlewareList} = require("./middleware");
const {handleUncaughtException, handleUnhandledRejection} = require("./shared/utils/processHandlers");
const appRoutes = require("./routes/appRoutes");
const {config} = require("./config");
const {connectMongoDB} = require("./shared/utils/connectMongoDB");
const {subscriptionService} = require("./modules/subscription/SubscriptionService");
const {mailer} = require("./mailer/Mailer");

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(...basicMiddlewareList);
app.use(appRoutes);
app.use(...errorMiddlewareList);

connectMongoDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on("uncaughtException", handleUncaughtException);
process.on("unhandledRejection", handleUnhandledRejection);

