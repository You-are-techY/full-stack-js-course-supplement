let TodoItem = require('mongoose').model('TodoItem');

exports.list = (req, res) => {
  console.log("fetch all todoItems");
  TodoItem.find({}).exec((err, todoItems) => {
    if(err || !todoItems) {
      console.log("error!", err);
      res.send({ success: false, message: err });
    } else {
      console.log("Query successful");
      res.send({ success: true, todoItems });
    }
  })
}

exports.getById = (req, res) => {
  console.log("fetch todoItem by _id", req.params.id);
  TodoItem.findById(req.params.id).exec((err, todoItem) => {
    if(err) {
      res.send({ success: false, message: err });
    } else if (!todoItem) {
      res.send({ success: false, message: "TodoItem not found." });
    } else {
      res.send({ success: true, todoItem });
    }
  })
}


exports.create = (req, res) => {
  console.log('creating new todo');
  let todoItem = new TodoItem({});
  console.log(req.body);
  // run through and create all fields on the model
  for(var k in req.body) {
    if(req.body.hasOwnProperty(k)) {
      todo[k] = req.body[k];
    }
  }

  todoItem.save((err, todoItem) => {
    if (err) {
      console.log("ERROR:");
      console.log(err);
      res.send({ success: false, message: err });
    } else if(!todoItem) {
      console.log("ERROR: Could not create TodoItem")
      res.send({ success: false, message: "Could not create TodoItem." });
    } else {
      console.log("created new todoItem");
      res.send({ success: true, todoItem });
    }
  });
}

exports.update = (req, res) => {
  console.log('updating todo');
  TodoItem.findById(req.params.id).exec((err, todoItem) => {
    if(err) {
      res.send({ success: false, message: err });
    } else if(!todoItem) {
      res.send({ success: false, message: "TodoItem not found." });
    } else {
      // run through and update all fields on the model
      for(var k in req.body) {
        if(req.body.hasOwnProperty(k)) {
          todo[k] = req.body[k];
        }
      }
      // now edit the 'updated' date
      todoItem.updated = new Date();
      todoItem.save((err, todoItem) => {
        if(err) {
          res.send({ success: false, message: err });
        } else if(!todoItem) {
          res.send({ success: false, message: "Could not save todoItem."});
        } else {
          res.send({ success: true, todoItem });
        }
      });
    }
  });
}

exports.delete = (req, res) => {
  console.log("deleting todoItem");
  TodoItem.findById(req.params.id).remove((err) => {
    if(err) {
      res.send({ success: false, message: err });
    } else {
      res.send({ success: true, message: "Deleted todoItem" });
    }
  });
}
