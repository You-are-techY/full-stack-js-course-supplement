const mongoose = require('mongoose');

const hostname = 'localhost'; 
const dbName = 'techy';

module.exports = () => {
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
}