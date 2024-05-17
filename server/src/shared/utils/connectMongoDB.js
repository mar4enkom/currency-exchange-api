const mongoose = require('mongoose');

module.exports.connectMongoDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB')
};