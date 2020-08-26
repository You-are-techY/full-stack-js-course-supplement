/**
 * CRUD API for TodoList.
 *
 * NOTE:
 * to restrict routes to only logged in users, add "requireLogin()"
 * to restrict routes to only admin users, add "requireRole('admin')"
 */

var todoLists = require('./todoListsController');

module.exports = function(router, requireLogin, requireRole) {

  // - Create
  router.post('/api/todo-lists'               , requireLogin(), todoLists.create); // must login by default

  // - Read
  router.get('/api/todo-lists'                , todoLists.list);
  // router.get('/api/todo-lists/search'         , todoLists.search); //disabled by default
  router.get('/api/todo-lists/by-:refKey/:refId*'  , todoLists.listByRefs);
  router.get('/api/todo-lists/by-:refKey-list'    , todoLists.listByValues);
  router.get('/api/todo-lists/default'        , todoLists.getDefault);
  // router.get('/api/todo-lists/schema'         , requireRole('admin'), todoLists.getSchema);
  router.get('/api/todo-lists/:id'            , todoLists.getById);

  // - Update
  router.put('/api/todo-lists/:id'            , requireLogin(), todoLists.update); // must login by default

  // - Delete
  router.delete('/api/todo-lists/:id'         , requireRole('admin'), todoLists.delete); // must be an 'admin' by default

}
