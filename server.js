const express = require('express');
const app = express();

const port = 3030;
const hostname = 'localhost'; 

// setup a root GET request 
app.get('/', (req, res) => res.send('Hello World! I am Express!!!'));

// setup the server 
app.listen(port, () => console.log(`Example app listening at http://${hostname}:${port}`));