const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 3030;
const hostname = 'localhost'; 
const dbName = 'techy';

mongoose.connect(`mongodb://${hostname}:27017/${dbName}`, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log('mongo connected!');
});

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/', function (req, res) {
  res.send('Got a POST request')
})

// Respond to a PUT request to the /user route:
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

// Respond to a DELETE request to the /user route:
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

// setup the server 
app.listen(port, () => console.log(`Example app listening at http://${hostname}:${port}`)); 