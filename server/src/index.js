const express = require("express");
const mongoose = require('mongoose');
const {basicMiddlewareList, errorMiddlewareList} = require("./middleware");
const {handleUncaughtException, handleUnhandledRejection} = require("./shared/utils/processHandlers");
const appRoutes = require("./routes/appRoutes");
const {connectMongoDB} = require("./shared/utils/connectMongoDB");
const {subscriptionService} = require("./modules/subscription/SubscriptionService");
const {mailer} = require("./mailer/Mailer");

const {Queue, Worker} = require('bullmq');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');

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

// const someQueue = new Queue('someQueueName', {
//     redis: { port: 6379, host: 'redis', },
// });

const connection = {
    connection: {
        host: "redis",
        port: 6379
    }
}

const myQueue = new Queue('foo', connection);

myQueue.add(
    'bird',
    { color: 'bird' },
    {
        repeat: {
            every: 10000,
            limit: 10,
        },
    },
);

async function addJobs() {
    await myQueue.add('myJobName', { foo: 'bar' });
    await myQueue.add('myJobName', { qux: 'baz' });
}

(async () => {
    await addJobs();
})()

const worker = new Worker('foo', async job => {
    console.log(job.data);
}, connection);
