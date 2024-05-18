const express = require("express");
const mongoose = require('mongoose');
const {basicMiddlewareList, errorMiddlewareList} = require("./middleware");
const {handleUncaughtException, handleUnhandledRejection} = require("./shared/utils/processHandlers");
const appRoutes = require("./routes/appRoutes");
const {connectMongoDB} = require("./shared/utils/connectMongoDB");
const {mailer} = require("./mailer/Mailer");

const {Queue, Worker} = require('bullmq');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const {config} = require("./config/config");
const {sendEmailCreatorQueue} = require("./jobs/sendEmail/sendEmailJobs");
const {SEND_EMAIL_QUEUE_ID, SEND_EMAIL_CREATOR_QUEUE_ID} = require("./jobs/sendEmail/constants");
const {v4} = require("uuid");

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

