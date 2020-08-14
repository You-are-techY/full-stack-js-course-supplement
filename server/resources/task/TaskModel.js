const mongoose = require('mongoose');
let ObjectId = mongoose.SchemaTypes.ObjectId;

const taskSchema = new mongoose.Schema({
  text: { type: String },
  done: { type: Boolean, default: false },
  _todoList: { type: ObjectId, ref: 'TodoList' }
});


const Task = mongoose.model('Task', taskSchema);
