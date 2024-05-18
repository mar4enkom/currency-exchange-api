module.exports.config = {
    rateNotificationsCronPattern: '37 11 * * *',
    redisConnection: {
        connection: {
            host: "redis",
            port: 6379
        }
    }
}