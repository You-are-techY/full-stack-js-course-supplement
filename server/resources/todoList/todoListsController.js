/**
 * Sever-side controllers for TodoList.
 * By default, Yote's server controllers are dynamic relative
 * to their models -- i.e. if you add fields to the TodoList
 * model, the create and update controllers below will respect
 * the new schema.
 *
 * NOTE: HOWEVER, you still need to make sure to account for
 * any model changes on the client
 */

let TodoList = require('mongoose').model('TodoList');

exports.list = (req, res) => {
  if(req.query.page) {
    // paginate on the server
    var page = req.query.page || 1;
    var per = req.query.per || 20;
    TodoList.find({}).skip((page-1)*per).limit(per).exec((err, todoLists) => {
      if(err || !todoLists) {
        logger.error("ERROR:");
        logger.info(err);
        res.send({success: false, message: err});
      } else {
        res.send({
          success: true
          , todoLists: todoLists
          , pagination: {
            per: per
            , page: page
          }
        });
      }
    });
  } else {
    // list all todoLists
    TodoList.find({}).exec((err, todoLists) => {
      if(err || !todoLists) {
        logger.error("ERROR:");
        logger.info(err);
        res.send({ success: false, message: err });
      } else {
        res.send({ success: true, todoLists: todoLists });
      }
    });
  }
}

exports.listByValues = (req, res) => {
  /**
   * returns list of todoLists queried from the array of _id's passed in the query param
   *
   * NOTES:
   * node default max request headers + uri size is 80kb.
   */

  if(!req.query[req.params.refKey]) {
    // make sure the correct query params are included
    res.send({success: false, message: `Missing query param(s) specified by the ref: ${req.params.refKey}`});
  } else {
    TodoList.find({[req.params.refKey]: {$in: [].concat(req.query[req.params.refKey]) }}, (err, todoLists) => {
        if(err || !todoLists) {
          res.send({success: false, message: `Error querying for todoLists by ${[req.params.refKey]} list`, err});
        } else  {
          res.send({success: true, todoLists});
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
    TodoList.find(query, (err, todoLists) => {
      if(err || !todoLists) {
        res.send({success: false, message: `Error retrieving todoLists by ${req.params.refKey}: ${req.params.refId}`});
      } else {
        res.send({success: true, todoLists})
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
    TodoList.find(mongoQuery).skip((page-1)*per).limit(per).exec((err, todoLists) => {
      if(err || !todoLists) {
        logger.error("ERROR:");
        logger.info(err);
        res.send({ success: false, message: err });
      } else {
        res.send({
          success: true
          , todoLists: todoLists
          , pagination: {
            per: per
            , page: page
          }
        });
      }
    });
  } else {
    TodoList.find(mongoQuery).exec((err, todoLists) => {
      if(err || !todoLists) {
        logger.error("ERROR:");
        logger.info(err);
        res.send({ success: false, message: err });
      } else {
        res.send({ success: true, todoLists: todoLists });
      }
    });
  }
}

exports.getById = (req, res) => {
  logger.info('get todoList by id');
  TodoList.findById(req.params.id).exec((err, todoList) => {
    if(err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else if (!todoList) {
      logger.error("ERROR: TodoList not found.");
      res.send({ success: false, message: "TodoList not found." });
    } else {
      res.send({ success: true, todoList: todoList });
    }
  });
}

exports.getSchema = (req, res) => {
  /**
   * This is admin protected and useful for displaying REST api documentation
   */
  logger.info('get todoList full mongo schema object');
  res.send({success: true, schema: TodoList.getSchema()});
}


exports.getDefault = (req, res) => {
  /**
   * This is an open api call by default (see what I did there?) and is used to
   * return the default object back to the Create components on the client-side.
   * 
   * NOTE: uses /global/utils/api.js to return default values IF defined on the model.
   * will otherwise return null. 
   */
  logger.info('get todoList default object');
  res.send({success: true, defaultObj: TodoList.getDefault()});
}

exports.create = (req, res) => {
  logger.info('creating new todoList');
  let todoList = new TodoList({});

  // run through and create all fields on the model
  for(var k in req.body) {
    if(req.body.hasOwnProperty(k)) {
      todoList[k] = req.body[k];
    }
  }

  todoList.save((err, todoList) => {
    if (err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else if(!todoList) {
      logger.error("ERROR: Could not create TodoList.");
      res.send({ success: false, message: "Could not create TodoList." });
    } else {
      logger.info("created new todoList");
      res.send({ success: true, todoList: todoList });
    }
  });
}

exports.update = (req, res) => {
  logger.info('updating todoList');
  TodoList.findById(req.params.id).exec((err, todoList) => {
    if(err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else if(!todoList) {
      logger.error("ERROR: TodoList not found.");
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
          logger.error("ERROR:");
          logger.info(err);
          res.send({ success: false, message: err });
        } else if(!todoList) {
          logger.error("ERROR: Could not save todoList.");
          res.send({ success: false, message: "Could not save todoList."});
        } else {
          res.send({ success: true, todoList: todoList });
        }
      });
    }
  });
}

exports.delete = (req, res) => {
  logger.warn("deleting todoList");
  TodoList.findById(req.params.id).remove((err) => {
    if(err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else {
      res.send({ success: true, message: "Deleted todoList" });
    }
  });
}
