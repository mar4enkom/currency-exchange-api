const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);