/**
 * CRUD API for Comment.
 *
 * NOTE:
 * to restrict routes to only logged in users, add "requireLogin()"
 * to restrict routes to only admin users, add "requireRole('admin')"
 */

var comments = require('./commentsController');

module.exports = function(router, requireLogin, requireRole) {

  // - Create
  router.post('/api/comments'               , requireLogin(), comments.create); // must login by default

  // - Read
  router.get('/api/comments'                , comments.list);
  // router.get('/api/comments/search'         , comments.search); //disabled by default
  router.get('/api/comments/by-:refKey/:refId*'  , comments.listByRefs);
  router.get('/api/comments/by-:refKey-list'    , comments.listByValues);
  router.get('/api/comments/default'        , comments.getDefault);
  // router.get('/api/comments/schema'         , requireRole('admin'), comments.getSchema);
  router.get('/api/comments/:id'            , comments.getById);

  // - Update
  router.put('/api/comments/:id'            , requireLogin(), comments.update); // must login by default

  // - Delete
  router.delete('/api/comments/:id'         , requireRole('admin'), comments.delete); // must be an 'admin' by default

}
