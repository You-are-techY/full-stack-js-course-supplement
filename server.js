const http = require('http'); // this is part of Node

const port = 3030;
const hostname = 'localhost'; 

 
// Create server
let server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
})
 
// Listen
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});