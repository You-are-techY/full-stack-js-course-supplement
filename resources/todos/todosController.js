Todo = require('mongoose').model('Todo');

exports.list = (req, res) => {
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