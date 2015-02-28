var express = require('express');

var port = process.env.PORT || 1337;

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(port);
console.log("Server is up");
