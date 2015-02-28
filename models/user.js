var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    login: String,
    password: String,
    name: String,
    level: Number,
    likes: [String]
});

module.exports = mongoose.model('User', userSchema);
