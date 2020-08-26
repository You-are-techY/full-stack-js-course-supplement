/**
 * CRUD API for Task.
 *
 * NOTE:
 * to restrict routes to only logged in users, add "requireLogin()"
 * to restrict routes to only admin users, add "requireRole('admin')"
 */

var tasks = require('./tasksController');

module.exports = function(router, requireLogin, requireRole) {

  // - Create
  router.post('/api/tasks'               , requireLogin(), tasks.create); // must login by default

  // - Read
  router.get('/api/tasks'                , requireLogin(), tasks.list);
  // router.get('/api/tasks/search'         , requireLogin(), tasks.search); //disabled by default
  router.get('/api/tasks/by-:refKey/:refId*'  , requireLogin(), tasks.listByRefs);
  router.get('/api/tasks/by-:refKey-list'    , requireLogin(), tasks.listByValues);
  router.get('/api/tasks/default'        , requireLogin(), tasks.getDefault);
  // router.get('/api/tasks/schema'         , requireLogin(), requireRole('admin'), tasks.getSchema);
  router.get('/api/tasks/:id'            , requireLogin(), tasks.getById);

  // - Update
  router.put('/api/tasks/:id'            , requireLogin(), tasks.update); // must login by default

  // - Delete
  router.delete('/api/tasks/:id'         , requireRole('admin'), tasks.delete); // must be an 'admin' by default

}
