/**
 * Data Model for Comment.
 *
 * By default, Yote's server controllers are dynamic relative
 * to their models -- i.e. if you add properties to the
 * commentSchema below, the create and update controllers
 * will respect the updated model.
 *
 * NOTE: make sure to account for any model changes on the client
 */

const apiUtils = require('../../global/utils/api');
let mongoose = require('mongoose');
let ObjectId = mongoose.SchemaTypes.ObjectId;

// define comment schema
const commentSchema = mongoose.Schema({
  // default values from Yote CLI
  created:                  { type: Date, default: Date.now }
  , updated:                { type: Date, default: Date.now }

  // specific values for comment go below
  , name:                   { type: String, required: '{PATH} is required!' }

});

// comment instance methods go here
// commentSchema.methods.methodName = function() {};

// comment model static functions go here
// commentSchema.statics.staticFunctionName = function() {};
commentSchema.statics.getSchema = () => {
  logger.info('return default schema paths');
  let schema = {}
  commentSchema.eachPath((path, schemaType) => {
    // console.log(path, schemaType);
    schema[path] = schemaType;
  });
  return schema;
}

commentSchema.statics.getDefault = () => {
  logger.info('return default object based on schema');
  let defObj = {};
  commentSchema.eachPath((path, schemaType) => {
    defObj[path] = apiUtils.defaultValueFromSchema(schemaType);
  });
  return defObj;
}

const Comment = mongoose.model('Comment', commentSchema);


// // comment model methods
// function createDefaults() {
//   Comment.find({}).exec(function(err, comments) {
//     if(comments.length == 0) {
//       Comment.create({
//         name: "Sample Comment Name!"
//       });
//       logger.info("created initial comment defaults");
//     }
//   });
// }
//
// exports.createDefaults = createDefaults;
