const http = require('http'); // this is part of Node
const serveStatic = require('serve-static'); // npm install --save serve-static 
const finalhandler = require('finalhandler'); // npm install --save finalhandler

const port = 3030;
const hostname = 'localhost'; 

// Serve up public directory
let serve = serveStatic('public', { 'index': ['index.html', 'index.htm'] })
 
// Create server
let server = http.createServer((req, res) => {
  serve(req, res, finalhandler(req, res));
})
 
// Listen
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});