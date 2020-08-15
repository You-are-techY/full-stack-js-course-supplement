let Task = require('mongoose').model('Task');

exports.list = (req, res) => {
  console.log("fetch all tasks");
  Task.find({}).exec((err, tasks) => {
    if(err || !tasks) {
      console.log("error!", err);
      res.send({ success: false, message: err });
    } else {
      console.log("Query successful");
      res.send({ success: true, tasks });
    }
  })
}

exports.getByTodoList = (req, res) => {
  console.log("fetch all tasks by todo list with id", req.params.todoListId);
  Task.find({_todoList: req.params.todoListId}).exec((err, tasks) => {
    if(err || !tasks) {
      console.log("error!", err);
      res.send({ success: false, message: err });
    } else {
      console.log("Query successful");
      res.send({ success: true, tasks });
    }
  })
}

exports.getById = (req, res) => {
  console.log("fetch task by _id", req.params.id);
  Task.findById(req.params.id).exec((err, task) => {
    if(err) {
      res.send({ success: false, message: err });
    } else if (!task) {
      res.send({ success: false, message: "Task not found." });
    } else {
      res.send({ success: true, task });
    }
  })
}


exports.create = (req, res) => {
  console.log('creating new task');
  let task = new Task({});
  console.log(req.body);
  // run through and create all fields on the model
  for(var k in req.body) {
    if(req.body.hasOwnProperty(k)) {
      task[k] = req.body[k];
    }
  }

  task.save((err, task) => {
    if (err) {
      console.log("ERROR:");
      console.log(err);
      res.send({ success: false, message: err });
    } else if(!task) {
      console.log("ERROR: Could not create Task")
      res.send({ success: false, message: "Could not create Task." });
    } else {
      console.log("created new task");
      res.send({ success: true, task });
    }
  });
}

exports.update = (req, res) => {
  console.log('updating task');
  Task.findById(req.params.id).exec((err, task) => {
    if(err) {
      res.send({ success: false, message: err });
    } else if(!task) {
      res.send({ success: false, message: "Task not found." });
    } else {
      // run through and update all fields on the model
      for(var k in req.body) {
        if(req.body.hasOwnProperty(k)) {
          task[k] = req.body[k];
        }
      }
      // now edit the 'updated' date
      task.updated = new Date();
      task.save((err, task) => {
        if(err) {
          res.send({ success: false, message: err });
        } else if(!task) {
          res.send({ success: false, message: "Could not save task."});
        } else {
          res.send({ success: true, task });
        }
      });
    }
  });
}

exports.delete = (req, res) => {
  console.log("deleting task");
  Task.findById(req.params.id).remove((err) => {
    if(err) {
      res.send({ success: false, message: err });
    } else {
      res.send({ success: true, message: "Deleted task" });
    }
  });
}
