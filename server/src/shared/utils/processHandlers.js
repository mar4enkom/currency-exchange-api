// Here we can implement logging or send notifications that unexpected error happened

module.exports = {
    handleUncaughtException: async (error) => {
        console.error("Uncaught exception");
        console.log(error);
        process.exit(0);
    },
    handleUnhandledRejection: async (reason) => {
        console.error("Unhandled rejection");
        console.log(reason);
        process.exit(0);
    }
} ;