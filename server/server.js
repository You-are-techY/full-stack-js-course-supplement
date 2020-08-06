const express = require('express');
const app = express();
let serveStatic     = require('serve-static');
let bodyParser      = require('body-parser');

const port = 3030;
const hostname = 'localhost'; 

// initialize db
require('./db')();

app.use(serveStatic(__dirname + '/public'));

// tell server how to parse req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// configure server routes
let router = express.Router();
require('./router')(router, app);
app.use('/', router);

// setup the server 
app.listen(port, () => console.log(`Example app listening at http://${hostname}:${port}`)); 