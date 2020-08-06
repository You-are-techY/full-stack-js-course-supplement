let Todo = require('mongoose').model('Todo');

exports.list = (req, res) => {
  console.log("fetch all todos");
  Todo.find({}).exec((err, todos) => {
    if(err || !todos) {
      console.log("error!", err);
      res.send({ success: false, message: err });
    } else {
      console.log("Query successful");
      res.send({ success: true, todos });
    }
  })
}

exports.getById = (req, res) => {
  console.log("fetch todo by _id", req.params.id);
  Todo.findById(req.params.id).exec((err, todo) => {
    if(err) {
      res.send({ success: false, message: err });
    } else if (!todo) {
      res.send({ success: false, message: "Todo not found." });
    } else {
      res.send({ success: true, todo });
    }
  })
}


exports.create = (req, res) => {
  console.log('creating new todo');
  let todo = new Todo({});
  console.log(req.body);
  // run through and create all fields on the model
  for(var k in req.body) {
    if(req.body.hasOwnProperty(k)) {
      todo[k] = req.body[k];
    }
  }

  todo.save((err, todo) => {
    if (err) {
      console.log("ERROR:");
      console.log(err);
      res.send({ success: false, message: err });
    } else if(!todo) {
      console.log("ERROR: Could not create Todo")
      res.send({ success: false, message: "Could not create Todo." });
    } else {
      console.log("created new todo");
      res.send({ success: true, todo });
    }
  });
}

exports.update = (req, res) => {
  console.log('updating todo');
  Todo.findById(req.params.id).exec((err, todo) => {
    if(err) {
      res.send({ success: false, message: err });
    } else if(!todo) {
      res.send({ success: false, message: "Todo not found." });
    } else {
      // run through and update all fields on the model
      for(var k in req.body) {
        if(req.body.hasOwnProperty(k)) {
          todo[k] = req.body[k];
        }
      }
      // now edit the 'updated' date
      todo.updated = new Date();
      todo.save((err, todo) => {
        if(err) {
          res.send({ success: false, message: err });
        } else if(!todo) {
          res.send({ success: false, message: "Could not save todo."});
        } else {
          res.send({ success: true, todo });
        }
      });
    }
  });
}

exports.delete = (req, res) => {
  console.log("deleting todo");
  Todo.findById(req.params.id).remove((err) => {
    if(err) {
      res.send({ success: false, message: err });
    } else {
      res.send({ success: true, message: "Deleted todo" });
    }
  });
}
