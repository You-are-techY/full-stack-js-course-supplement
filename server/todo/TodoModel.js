const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: { type: String },
  done: { type: Boolean, default: false },
});


const Todo = mongoose.model('Todo', todoSchema);


// create default todo 
const createDefaults = () => {
  Todo.find({}).exec((err, todos) => {
    if(todos.length == 0) {
      Todo.create({
        text: 'Sample Todo 1'
      });
      Todo.create({
        text: 'Sample Todo 2'
      });
      Todo.create({
        text: 'Sample Todo 3'
      });
      Todo.create({
        text: 'Sample Todo 4'
        , done: true
      });
      console.log("Created initial todo");
    }
  })
}

exports.createDefaults = createDefaults;