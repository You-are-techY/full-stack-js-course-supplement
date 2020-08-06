const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 3030;
const hostname = 'localhost'; 
const dbName = 'techy';

mongoose.connect(`mongodb://${hostname}/${dbName}`, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log('mongo connected!');
});

const todoSchema = new mongoose.Schema({
  text: { type: String },
  done: { type: Boolean, default: false },
});

const Todo = mongoose.model('Todo', todoSchema);

const dummy = new Todo({text: 'test dummy todo'});
console.log(dummy);
dummy.save((err, dummy) => {
  if(err) { 
    return console.error(err); 
  } else {
    console.log('dummy saved as', dummy)
  }
})

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