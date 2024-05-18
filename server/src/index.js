const express = require("express");
const mongoose = require('mongoose');
const {Queue, Worker} = require('bullmq');
const {v4} = require("uuid");
const {config} = require("./config/config");
const {basicMiddlewareList, errorMiddlewareList} = require("./middleware");
const {handleUncaughtException, handleUnhandledRejection} = require("./shared/utils/processHandlers");
const appRoutes = require("./routes/appRoutes");
const {connectMongoDB} = require("./shared/utils/connectMongoDB");
const {sendEmailCreatorQueue} = require("./jobs/sendEmail/sendEmailJobs");
const {SEND_EMAIL_QUEUE_ID, SEND_EMAIL_CREATOR_QUEUE_ID} = require("./jobs/sendEmail/constants");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

connectMongoDB();

// add job to queue that gets current rate and create jobs that send emails
sendEmailCreatorQueue.add(SEND_EMAIL_CREATOR_QUEUE_ID, true, {
    repeat: {
        pattern: config.rateNotificationsCronPattern,
    },
    jobId: v4()
})

app.use(...basicMiddlewareList);
app.use(appRoutes);
app.use(...errorMiddlewareList);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on("uncaughtException", handleUncaughtException);
process.on("unhandledRejection", handleUnhandledRejection);

