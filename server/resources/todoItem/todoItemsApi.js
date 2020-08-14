// pull in todoItems controller 
let todoItems = require('./todoItemsController');

module.exports = (router) => {
  // api routes 
  
  // - Create
  router.post('/api/todo-items', todoItems.create); 
  
  // - Read
  router.get('/api/todo-items', todoItems.list);
  router.get('/api/todo-items/:id', todoItems.getById);
  
  // - Update
  router.put('/api/todo-items/:id', todoItems.update); 
  
  // - Delete
  router.delete('/api/todo-items/:id', todoItems.delete); 
}
