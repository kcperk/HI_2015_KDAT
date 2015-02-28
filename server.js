var express = require('express');
var path = require('path');
var app = express()

var port = process.env.PORT || 1337;

// Serve static files
app.use('/', express.static(path.join(__dirname + '/inkWaves')));
app.get('/t', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
})

// Route for everything else.
app.get('*', function(req, res){
  res.send('Hello World');
});

app.listen(port);
console.log("Server is up");
