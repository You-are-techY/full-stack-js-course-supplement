// pull in todoLists controller 
let todoLists = require('./todoListsController');

module.exports = (router) => {
  // api routes 
  
  // - Create
  router.post('/api/todo-lists', todoLists.create); 
  
  // - Read
  router.get('/api/todo-lists', todoLists.list);
  router.get('/api/todo-lists/:id', todoLists.getById);
  
  // - Update
  router.put('/api/todo-lists/:id', todoLists.update); 
  
  // - Delete
  router.delete('/api/todo-lists/:id', todoLists.delete); 
}
