const mongoose = require('mongoose');

const hostname = 'localhost'; 
const dbName = 'techy';

let TodoList = require('./resources/todoList/TodoListModel.js');
let Task = require('./resources/task/TaskModel.js');

module.exports = () => {
  mongoose.connect(`mongodb://${hostname}/${dbName}`, {useNewUrlParser: true});
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    // we're connected!
    console.log('mongo connected!');
  });

  // when the server connect, create defaults 
  TodoList.createDefaults();
}
