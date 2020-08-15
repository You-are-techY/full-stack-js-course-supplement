// pull in tasks controller 
let tasks = require('./tasksController');

module.exports = (router) => {
  // api routes 
  
  // - Create
  router.post('/api/tasks', tasks.create); 
  
  // - Read
  router.get('/api/tasks', tasks.list);
  router.get('/api/tasks/by-todo-list/:todoListId', tasks.getByTodoList);
  router.get('/api/tasks/:id', tasks.getById);
  
  // - Update
  router.put('/api/tasks/:id', tasks.update); 
  
  // - Delete
  router.delete('/api/tasks/:id', tasks.delete); 
}
