var http = require('http');

var port = process.env.PORT || 1337;
function handleRequest(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(handleRequest).listen(port);
console.log("Server is up");
