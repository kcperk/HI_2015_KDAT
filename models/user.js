var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String
    password: String
    level: Integer
    likes: [{like : String}]
});

module.exports = mongoose.models('User', userSchema);
