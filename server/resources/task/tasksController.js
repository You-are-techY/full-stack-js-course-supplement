/**
 * Sever-side controllers for Task.
 * By default, Yote's server controllers are dynamic relative
 * to their models -- i.e. if you add fields to the Task
 * model, the create and update controllers below will respect
 * the new schema.
 *
 * NOTE: HOWEVER, you still need to make sure to account for
 * any model changes on the client
 */

let Task = require('mongoose').model('Task');

exports.list = (req, res) => {
  if(req.query.page) {
    // paginate on the server
    var page = req.query.page || 1;
    var per = req.query.per || 20;
    Task.find({}).skip((page-1)*per).limit(per).exec((err, tasks) => {
      if(err || !tasks) {
        logger.error("ERROR:");
        logger.info(err);
        res.send({success: false, message: err});
      } else {
        res.send({
          success: true
          , tasks: tasks
          , pagination: {
            per: per
            , page: page
          }
        });
      }
    });
  } else {
    // list all tasks
    Task.find({}).exec((err, tasks) => {
      if(err || !tasks) {
        logger.error("ERROR:");
        logger.info(err);
        res.send({ success: false, message: err });
      } else {
        res.send({ success: true, tasks: tasks });
      }
    });
  }
}

exports.listByValues = (req, res) => {
  /**
   * returns list of tasks queried from the array of _id's passed in the query param
   *
   * NOTES:
   * node default max request headers + uri size is 80kb.
   */

  if(!req.query[req.params.refKey]) {
    // make sure the correct query params are included
    res.send({success: false, message: `Missing query param(s) specified by the ref: ${req.params.refKey}`});
  } else {
    Task.find({[req.params.refKey]: {$in: [].concat(req.query[req.params.refKey]) }}, (err, tasks) => {
        if(err || !tasks) {
          res.send({success: false, message: `Error querying for tasks by ${[req.params.refKey]} list`, err});
        } else  {
          res.send({success: true, tasks});
        }
    })
  }
}

exports.listByRefs = (req, res) => {
  /**
   * NOTE: This let's us query by ANY string or pointer key by passing in a refKey and refId
   */

   // build query
  let query = {
    [req.params.refKey]: req.params.refId === 'null' ? null : req.params.refId
  }
  // test for optional additional parameters
  const nextParams = req.params['0'];
  if(nextParams.split("/").length % 2 == 0) {
    // can't have length be uneven, throw error
    res.send({success: false, message: "Invalid parameter length"});
  } else {
    if(nextParams.length !== 0) {
      for(let i = 1; i < nextParams.split("/").length; i+= 2) {
        query[nextParams.split("/")[i]] = nextParams.split("/")[i+1] === 'null' ? null : nextParams.split("/")[i+1]
      }
    }
    Task.find(query, (err, tasks) => {
      if(err || !tasks) {
        res.send({success: false, message: `Error retrieving tasks by ${req.params.refKey}: ${req.params.refId}`});
      } else {
        res.send({success: true, tasks})
      }
    })
  }
}

exports.search = (req, res) => {
  // search by query parameters
  // NOTE: It's up to the front end to make sure the params match the model
  let mongoQuery = {};
  let page, per;

  for(key in req.query) {
    if(req.query.hasOwnProperty(key)) {
      if(key == "page") {
        page = parseInt(req.query.page);
      } else if(key == "per") {
        per = parseInt(req.query.per);
      } else {
        logger.debug("found search query param: " + key);
        mongoQuery[key] = req.query[key];
      }
    }
  }

  logger.info(mongoQuery);
  if(page || per) {
    page = page || 1;
    per = per || 20;
    Task.find(mongoQuery).skip((page-1)*per).limit(per).exec((err, tasks) => {
      if(err || !tasks) {
        logger.error("ERROR:");
        logger.info(err);
        res.send({ success: false, message: err });
      } else {
        res.send({
          success: true
          , tasks: tasks
          , pagination: {
            per: per
            , page: page
          }
        });
      }
    });
  } else {
    Task.find(mongoQuery).exec((err, tasks) => {
      if(err || !tasks) {
        logger.error("ERROR:");
        logger.info(err);
        res.send({ success: false, message: err });
      } else {
        res.send({ success: true, tasks: tasks });
      }
    });
  }
}

exports.getById = (req, res) => {
  logger.info('get task by id');
  Task.findById(req.params.id).exec((err, task) => {
    if(err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else if (!task) {
      logger.error("ERROR: Task not found.");
      res.send({ success: false, message: "Task not found." });
    } else {
      res.send({ success: true, task: task });
    }
  });
}

exports.getSchema = (req, res) => {
  /**
   * This is admin protected and useful for displaying REST api documentation
   */
  logger.info('get task full mongo schema object');
  res.send({success: true, schema: Task.getSchema()});
}


exports.getDefault = (req, res) => {
  /**
   * This is an open api call by default (see what I did there?) and is used to
   * return the default object back to the Create components on the client-side.
   * 
   * NOTE: uses /global/utils/api.js to return default values IF defined on the model.
   * will otherwise return null. 
   */
  logger.info('get task default object');
  res.send({success: true, defaultObj: Task.getDefault()});
}

exports.create = (req, res) => {
  logger.info('creating new task');
  let task = new Task({});

  // run through and create all fields on the model
  for(var k in req.body) {
    if(req.body.hasOwnProperty(k)) {
      task[k] = req.body[k];
    }
  }

  task.save((err, task) => {
    if (err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else if(!task) {
      logger.error("ERROR: Could not create Task.");
      res.send({ success: false, message: "Could not create Task." });
    } else {
      logger.info("created new task");
      res.send({ success: true, task: task });
    }
  });
}

exports.update = (req, res) => {
  logger.info('updating task');
  Task.findById(req.params.id).exec((err, task) => {
    if(err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else if(!task) {
      logger.error("ERROR: Task not found.");
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
          logger.error("ERROR:");
          logger.info(err);
          res.send({ success: false, message: err });
        } else if(!task) {
          logger.error("ERROR: Could not save task.");
          res.send({ success: false, message: "Could not save task."});
        } else {
          res.send({ success: true, task: task });
        }
      });
    }
  });
}

exports.delete = (req, res) => {
  logger.warn("deleting task");
  Task.findById(req.params.id).remove((err) => {
    if(err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else {
      res.send({ success: true, message: "Deleted task" });
    }
  });
}
