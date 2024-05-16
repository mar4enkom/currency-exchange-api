// Here we can implement logging or send notifications that unexpected error happened

module.exports = {
    handleUncaughtException: async (error) => {
        console.error("Uncaught exception");
        process.exit(0);
    },
    handleUnhandledRejection: async (reason) => {
        console.error("Unhandled rejection");
        process.exit(0);
    }
} ;