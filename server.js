const express = require('express');
const app = express();

const port = 3030;
const hostname = 'localhost'; 

// initialize db
require('./db')();

// configure server routes
let router = express.Router();
require('./router')(router, app);
app.use('/', router);

// setup the server 
app.listen(port, () => console.log(`Example app listening at http://${hostname}:${port}`)); 