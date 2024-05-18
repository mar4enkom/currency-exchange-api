
module.exports = {
    errorHandlingMiddleware: async function (error, _req, res, _next) {
        res.status(500).json("Internal server error");
    }
}