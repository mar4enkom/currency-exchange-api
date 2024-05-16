module.exports = {
    notFoundMiddleware: function (req, res) {
        res.status(404).json("Not found");
    }
}