// pull in todos controller 
let todos = require('./todosController');

module.exports = (router) => {
  // api routes 
  
  // - Create
  router.post('/api/todos', todos.create); 
  
  // - Read
  router.get('/api/todos', todos.list);
  router.get('/api/todos/:id', todos.getById);
  
  // - Update
  router.put('/api/todos/:id', todos.update); 
  
  // - Delete
  router.delete('/api/todos/:id', todos.delete); 
}
