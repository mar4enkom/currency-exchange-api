const express = require("express");
const mongoose = require('mongoose');
const {basicMiddlewareList, errorMiddlewareList} = require("./middleware");
const {handleUncaughtException, handleUnhandledRejection} = require("./shared/utils/processHandlers");
const appRoutes = require("./routes/appRoutes");

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(...basicMiddlewareList);
app.use(appRoutes);
app.use(...errorMiddlewareList);

connect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on("uncaughtException", handleUncaughtException);
process.on("unhandledRejection", handleUnhandledRejection);

function connect() {
    mongoose.connection
        .on('error', console.log)
        .on('disconnected', connect)
        .once('open', listen);
    return mongoose.connect(process.env.MONGODB_URI, {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
