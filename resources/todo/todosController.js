let Todo = require('mongoose').model('Todo');

exports.list = (req, res) => {
  console.log("fetch all todos");
  Todo.find({}).exec((err, todos) => {
    if(err || !todos) {
      console.log("error!", err);
      res.send({success: false, message: err});
    } else {
      console.log("Query successful");
      res.send({success: true, todos});
    }
  })
}

exports.getById = (req, res) => {
  console.log("fetch todo by _id", req.params.id);
  Todo.find({_id: req.params.id}).exec(())
}