var http = require('http');



function handleRequest(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(handleRequest).listen(8888);
console.log("Server is up");
