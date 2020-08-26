/**
 * Data Model for TodoList.
 *
 * By default, Yote's server controllers are dynamic relative
 * to their models -- i.e. if you add properties to the
 * todoListSchema below, the create and update controllers
 * will respect the updated model.
 *
 * NOTE: make sure to account for any model changes on the client
 */

const apiUtils = require('../../global/utils/api');
let mongoose = require('mongoose');
let ObjectId = mongoose.SchemaTypes.ObjectId;

// define todoList schema
const todoListSchema = mongoose.Schema({
  // default values from Yote CLI
  created:                  { type: Date, default: Date.now }
  , updated:                { type: Date, default: Date.now }

  // specific values for todoList go below
  , name:                   { type: String, required: '{PATH} is required!' }
  , description:            { type: String }

  // relations 
  , _createdBy:             { type: ObjectId, ref: 'User' }
});

// todoList instance methods go here
// todoListSchema.methods.methodName = function() {};

// todoList model static functions go here
// todoListSchema.statics.staticFunctionName = function() {};
todoListSchema.statics.getSchema = () => {
  logger.info('return default schema paths');
  let schema = {}
  todoListSchema.eachPath((path, schemaType) => {
    // console.log(path, schemaType);
    schema[path] = schemaType;
  });
  return schema;
}

todoListSchema.statics.getDefault = () => {
  logger.info('return default object based on schema');
  let defObj = {};
  todoListSchema.eachPath((path, schemaType) => {
    defObj[path] = apiUtils.defaultValueFromSchema(schemaType);
  });
  return defObj;
}

const TodoList = mongoose.model('TodoList', todoListSchema);


// // todoList model methods
// function createDefaults() {
//   TodoList.find({}).exec(function(err, todoLists) {
//     if(todoLists.length == 0) {
//       TodoList.create({
//         name: "Sample TodoList Name!"
//       });
//       logger.info("created initial todoList defaults");
//     }
//   });
// }
//
// exports.createDefaults = createDefaults;
