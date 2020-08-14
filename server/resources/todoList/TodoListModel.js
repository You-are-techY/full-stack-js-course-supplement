const mongoose = require('mongoose');

const todoListSchema = new mongoose.Schema({
  name: { type: String },
});


const TodoList = mongoose.model('TodoList', todoListSchema);


// create default todoList 
const createDefaults = () => {
  TodoList.find({}).exec((err, todoLists) => {
    if(todoLists.length == 0) {
      TodoList.create({
        name: 'Sample Todo List 1'
      });
      TodoList.create({
        name: 'Sample Todo List 2'
      });
      console.log("Created initial todoList");
    }
  })
}

exports.createDefaults = createDefaults;