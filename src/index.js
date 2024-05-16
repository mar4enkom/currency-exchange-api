const express = require("express");
const {basicMiddlewareList, errorMiddlewareList} = require("./middleware");
const {handleUncaughtException, handleUnhandledRejection} = require("./shared/utils/processHandlers");
const appRoutes = require("./routes/appRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(...basicMiddlewareList);
app.use(appRoutes);
app.use(...errorMiddlewareList);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on("uncaughtException", handleUncaughtException);
process.on("unhandledRejection", handleUnhandledRejection);
