var mongoose = require('mongoose');
var database = require('./db.js');
var User = require('./models/user.js')
mongoose.connect(database.url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Got into the database')
});

var user = new User({name : 'Bob', login : 'Bob', password : 'adsfa', level : 1, likes : ['Cars', 'Books']});
user.save()
