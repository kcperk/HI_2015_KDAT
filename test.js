var mongoose = require('mongoose');
var database = require('./db.js');
var User = require('./models/user.js')


mongoose.connect(database.url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Got into the database')
});

var t = function (time, r) {
  r(time);
}

function sleep(milliSeconds) {
var startTime = new Date().getTime();
while (new Date().getTime() < startTime + milliSeconds);
}


var http = require("http");
  http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
    t(10000, sleep)

}).listen(8888);




//message('John', "tarun", "hello", "Yo", new Date().getTime());

console.log("After");
