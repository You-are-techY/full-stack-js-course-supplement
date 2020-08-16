/**
 * Sever-side controllers for Comment.
 * By default, Yote's server controllers are dynamic relative
 * to their models -- i.e. if you add fields to the Comment
 * model, the create and update controllers below will respect
 * the new schema.
 *
 * NOTE: HOWEVER, you still need to make sure to account for
 * any model changes on the client
 */

let Comment = require('mongoose').model('Comment');

exports.list = (req, res) => {
  if(req.query.page) {
    // paginate on the server
    var page = req.query.page || 1;
    var per = req.query.per || 20;
    Comment.find({}).skip((page-1)*per).limit(per).exec((err, comments) => {
      if(err || !comments) {
        logger.error("ERROR:");
        logger.info(err);
        res.send({success: false, message: err});
      } else {
        res.send({
          success: true
          , comments: comments
          , pagination: {
            per: per
            , page: page
          }
        });
      }
    });
  } else {
    // list all comments
    Comment.find({}).exec((err, comments) => {
      if(err || !comments) {
        logger.error("ERROR:");
        logger.info(err);
        res.send({ success: false, message: err });
      } else {
        res.send({ success: true, comments: comments });
      }
    });
  }
}

exports.listByValues = (req, res) => {
  /**
   * returns list of comments queried from the array of _id's passed in the query param
   *
   * NOTES:
   * node default max request headers + uri size is 80kb.
   */

  if(!req.query[req.params.refKey]) {
    // make sure the correct query params are included
    res.send({success: false, message: `Missing query param(s) specified by the ref: ${req.params.refKey}`});
  } else {
    Comment.find({[req.params.refKey]: {$in: [].concat(req.query[req.params.refKey]) }}, (err, comments) => {
        if(err || !comments) {
          res.send({success: false, message: `Error querying for comments by ${[req.params.refKey]} list`, err});
        } else  {
          res.send({success: true, comments});
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
    Comment.find(query, (err, comments) => {
      if(err || !comments) {
        res.send({success: false, message: `Error retrieving comments by ${req.params.refKey}: ${req.params.refId}`});
      } else {
        res.send({success: true, comments})
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
    Comment.find(mongoQuery).skip((page-1)*per).limit(per).exec((err, comments) => {
      if(err || !comments) {
        logger.error("ERROR:");
        logger.info(err);
        res.send({ success: false, message: err });
      } else {
        res.send({
          success: true
          , comments: comments
          , pagination: {
            per: per
            , page: page
          }
        });
      }
    });
  } else {
    Comment.find(mongoQuery).exec((err, comments) => {
      if(err || !comments) {
        logger.error("ERROR:");
        logger.info(err);
        res.send({ success: false, message: err });
      } else {
        res.send({ success: true, comments: comments });
      }
    });
  }
}

exports.getById = (req, res) => {
  logger.info('get comment by id');
  Comment.findById(req.params.id).exec((err, comment) => {
    if(err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else if (!comment) {
      logger.error("ERROR: Comment not found.");
      res.send({ success: false, message: "Comment not found." });
    } else {
      res.send({ success: true, comment: comment });
    }
  });
}

exports.getSchema = (req, res) => {
  /**
   * This is admin protected and useful for displaying REST api documentation
   */
  logger.info('get comment full mongo schema object');
  res.send({success: true, schema: Comment.getSchema()});
}


exports.getDefault = (req, res) => {
  /**
   * This is an open api call by default (see what I did there?) and is used to
   * return the default object back to the Create components on the client-side.
   * 
   * NOTE: uses /global/utils/api.js to return default values IF defined on the model.
   * will otherwise return null. 
   */
  logger.info('get comment default object');
  res.send({success: true, defaultObj: Comment.getDefault()});
}

exports.create = (req, res) => {
  logger.info('creating new comment');
  let comment = new Comment({});

  // run through and create all fields on the model
  for(var k in req.body) {
    if(req.body.hasOwnProperty(k)) {
      comment[k] = req.body[k];
    }
  }

  comment.save((err, comment) => {
    if (err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else if(!comment) {
      logger.error("ERROR: Could not create Comment.");
      res.send({ success: false, message: "Could not create Comment." });
    } else {
      logger.info("created new comment");
      res.send({ success: true, comment: comment });
    }
  });
}

exports.update = (req, res) => {
  logger.info('updating comment');
  Comment.findById(req.params.id).exec((err, comment) => {
    if(err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else if(!comment) {
      logger.error("ERROR: Comment not found.");
      res.send({ success: false, message: "Comment not found." });
    } else {
      // run through and update all fields on the model
      for(var k in req.body) {
        if(req.body.hasOwnProperty(k)) {
          comment[k] = req.body[k];
        }
      }
      // now edit the 'updated' date
      comment.updated = new Date();
      comment.save((err, comment) => {
        if(err) {
          logger.error("ERROR:");
          logger.info(err);
          res.send({ success: false, message: err });
        } else if(!comment) {
          logger.error("ERROR: Could not save comment.");
          res.send({ success: false, message: "Could not save comment."});
        } else {
          res.send({ success: true, comment: comment });
        }
      });
    }
  });
}

exports.delete = (req, res) => {
  logger.warn("deleting comment");
  Comment.findById(req.params.id).remove((err) => {
    if(err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else {
      res.send({ success: true, message: "Deleted comment" });
    }
  });
}
