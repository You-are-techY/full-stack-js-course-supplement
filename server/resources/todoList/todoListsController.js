let TodoList = require('mongoose').model('TodoList');

exports.list = (req, res) => {
  console.log("fetch all todoLists");
  TodoList.find({}).exec((err, todoLists) => {
    if(err || !todoLists) {
      console.log("error!", err);
      res.send({ success: false, message: err });
    } else {
      console.log("Query successful");
      res.send({ success: true, todoLists });
    }
  })
}

exports.getById = (req, res) => {
  console.log("fetch todoList by _id", req.params.id);
  TodoList.findById(req.params.id).exec((err, todoList) => {
    if(err) {
      res.send({ success: false, message: err });
    } else if (!todoList) {
      res.send({ success: false, message: "TodoList not found." });
    } else {
      res.send({ success: true, todoList });
    }
  })
}


exports.create = (req, res) => {
  console.log('creating new todoList');
  let todoList = new TodoList({});
  console.log(req.body);
  // run through and create all fields on the model
  for(var k in req.body) {
    if(req.body.hasOwnProperty(k)) {
      todoList[k] = req.body[k];
    }
  }

  todoList.save((err, todoList) => {
    if (err) {
      console.log("ERROR:");
      console.log(err);
      res.send({ success: false, message: err });
    } else if(!todoList) {
      console.log("ERROR: Could not create TodoList")
      res.send({ success: false, message: "Could not create TodoList." });
    } else {
      console.log("created new todoList");
      res.send({ success: true, todoList });
    }
  });
}

exports.update = (req, res) => {
  console.log('updating todoList');
  TodoList.findById(req.params.id).exec((err, todoList) => {
    if(err) {
      res.send({ success: false, message: err });
    } else if(!todoList) {
      res.send({ success: false, message: "TodoList not found." });
    } else {
      // run through and update all fields on the model
      for(var k in req.body) {
        if(req.body.hasOwnProperty(k)) {
          todoList[k] = req.body[k];
        }
      }
      // now edit the 'updated' date
      todoList.updated = new Date();
      todoList.save((err, todoList) => {
        if(err) {
          res.send({ success: false, message: err });
        } else if(!todoList) {
          res.send({ success: false, message: "Could not save todoList."});
        } else {
          res.send({ success: true, todoList });
        }
      });
    }
  });
}

exports.delete = (req, res) => {
  console.log("deleting todoList");
  TodoList.findById(req.params.id).remove((err) => {
    if(err) {
      res.send({ success: false, message: err });
    } else {
      res.send({ success: true, message: "Deleted todoList" });
    }
  });
}
