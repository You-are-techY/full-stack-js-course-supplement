let mongoose = require('mongoose');
let User = require('./resources/user/UserModel');
let logger = global.logger;

module.exports = function(config) {
  mongoose.Promise = global.Promise; // mongoose internal Promise library depreciated; use native
  mongoose.connect(config.db, {
    // useMongoClient: true // deprec. mongoose 5
  });
  var db = mongoose.connection;
  db.on('error', logger.error.bind(console, 'mongo connection error'));
  db.once('open', function callback() {
    logger.debug('mongo connection opened');
  });

  // any other initial model calls
  User.createDefaults();
};

// Yote models are defined below

let Task = require('./resources/task/TaskModel');
let TodoList = require('./resources/todoList/TodoListModel');
let Comment = require('./resources/comment/CommentModel');