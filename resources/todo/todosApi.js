// pull in todos controller 
let todos = require('./resources/todo/todosController');

// api routes 

// - Create
app.post('/api/todos', todos.create); 

// - Read
app.get('/api/todos', todos.list);
app.get('/api/todos/:id', todos.getById);

// - Update
app.put('/api/todos/:id', todos.update); 

// - Delete
app.delete('/api/todos/:id', todos.delete); 
