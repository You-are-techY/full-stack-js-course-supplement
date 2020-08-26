/**
 * Data Model for Task.
 *
 * By default, Yote's server controllers are dynamic relative
 * to their models -- i.e. if you add properties to the
 * taskSchema below, the create and update controllers
 * will respect the updated model.
 *
 * NOTE: make sure to account for any model changes on the client
 */

const apiUtils = require('../../global/utils/api');
let mongoose = require('mongoose');
let ObjectId = mongoose.SchemaTypes.ObjectId;

// define task schema
const taskSchema = mongoose.Schema({
  // default values from Yote CLI
  created:                  { type: Date, default: Date.now }
  , updated:                { type: Date, default: Date.now }

  // specific values for task go below
  , text:                   { type: String, required: '{PATH} is required!' }
  , notes:                  { type: String } // special details about this task 
  , status:                 { type: String, enum: ['open', 'done', 'archived'], default: 'open' }

  // relations 
  , _todoList:              { type: ObjectId, ref: 'TodoList' }
  , _createdBy:             { type: ObjectId, ref: 'User' }
  , _completedBy:           { type: ObjectId, ref: 'User' }
});

// task instance methods go here
// taskSchema.methods.methodName = function() {};

// task model static functions go here
// taskSchema.statics.staticFunctionName = function() {};
taskSchema.statics.getSchema = () => {
  logger.info('return default schema paths');
  let schema = {}
  taskSchema.eachPath((path, schemaType) => {
    // console.log(path, schemaType);
    schema[path] = schemaType;
  });
  return schema;
}

taskSchema.statics.getDefault = () => {
  logger.info('return default object based on schema');
  let defObj = {};
  taskSchema.eachPath((path, schemaType) => {
    defObj[path] = apiUtils.defaultValueFromSchema(schemaType);
  });
  return defObj;
}

const Task = mongoose.model('Task', taskSchema);


// // task model methods
// function createDefaults() {
//   Task.find({}).exec(function(err, tasks) {
//     if(tasks.length == 0) {
//       Task.create({
//         name: "Sample Task Name!"
//       });
//       logger.info("created initial task defaults");
//     }
//   });
// }
//
// exports.createDefaults = createDefaults;
