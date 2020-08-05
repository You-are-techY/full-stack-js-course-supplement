const express = require('express');
const app = express();

const port = 3030;
const hostname = 'localhost'; 

/**
 * This tells Express to look at the '/public' directory when we get a root get request
 */
// setup static files 
app.use('/', express.static('public'));

// setup a root GET request 
app.get('/', (req, res) => {
  console.log('serving static files');
  res.send('Hello World! Express is serving static files!');
});

// setup the server 
app.listen(port, () => console.log(`Example app listening at http://${hostname}:${port}`));