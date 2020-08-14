const mongoose = require('mongoose');
let ObjectId = mongoose.SchemaTypes.ObjectId;

const todoItemSchema = new mongoose.Schema({
  text: { type: String },
  done: { type: Boolean, default: false },
  _todoList: { type: ObjectId, ref: 'TodoList' }
});


const TodoItem = mongoose.model('TodoItem', todoItemSchema);
