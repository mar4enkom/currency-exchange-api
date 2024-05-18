module.exports.config = {
    rateNotificationsCronPattern: '0 0 * * *',
    redisConnection: {
        connection: {
            host: "redis",
            port: 6379
        }
    }
}