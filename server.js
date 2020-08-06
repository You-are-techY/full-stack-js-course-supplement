const express = require('express');
const app = express();

const port = 3030;
const hostname = 'localhost'; 

// initialize db
require('./db')();

// static routes
app.get('/', (req, res) => res.send('Hello World!'));

// setup the server 
app.listen(port, () => console.log(`Example app listening at http://${hostname}:${port}`)); 