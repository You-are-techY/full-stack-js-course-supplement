/**
 * Configure the API routes
 */

let User = require('mongoose').model('User');
let logger = global.logger;

// helper functions

function requireLogin() {
  /**
   * Anything that calls this method will check if a user is logged in or not.
   * If so, let them through. If not, block access.
   */
  return (req, res, next) => {
    // check by token
    if(req.headers.token) {
      // header has token. Use it.
      logger.debug("LOGIN CHECK HIT - by token");
      logger.debug(req.headers.token);

      User.findOne({apiToken: req.headers.token}).exec((err, user) => {
        if(err || !user) {
          logger.error(err);
          res.status(403);
          res.send({success: false, message: "UNAUTHORIZED - INVALID TOKEN"});
        } else {
          logger.debug("found user by header");

          // check token time period
          if(User.tokenExpired(user.tokenCreated)) {
            logger.debug("token is expired");
            res.status(403);
            res.send({success: false, message: "UNAUTHORIZED - TOKEN HAS EXPIRED"});
          } else {
            req.user = user;
            logger.debug("REQ.USER 1");
            logger.debug(req.user.username);
            next();
          }
        }
      });

    } else {
      // header does NOT have token. Check passport session
      logger.debug("LOGIN CHECK HIT - by cookie");

      // check by passport session
      if(!req.isAuthenticated()) {
        logger.warn("UNAUTHORIZED");
        res.status(403);
        res.send({success: false, message: "UNAUTHORIZED - NOT LOGGED IN"});
      } else {  next(); }
    }
  }
}


function requireRole(role) {
  /**
   * Anything that calls this method will check if a user is logged AND has a
   * user role in the user.roles array that matches the passed in 'role' @param.
   * If so, let them through. If not, block access.
   *
   * @param role == string
   */
  return (req, res, next) => {
    var rl = requireLogin();
    rl(req, res, function() {
      logger.debug("trying to require role");
      logger.debug(req.user.username);
      if(req.user.roles.indexOf(role) === -1) {
        res.status(403);
        res.send({success: false, message: "UNAUTHORIZED - " + role + " PRIVILEDGES REQUIRED"});
      } else {
        logger.debug("authorized.");
        next();
      }
    });
  }
}

// export Yote resource API paths
let routeFilenames = [];
module.exports = router => {
  /**
   *
   *
   */
  routeFilenames.forEach(filename => {
    logger.debug("filename: " + filename);
    require('../../resources/' + filename)(router, requireLogin, requireRole);
  });
}

// New Yote resource API route names generated by the Yote CLI
routeFilenames.push('user/usersApi');
routeFilenames.push('product/productsApi');

routeFilenames.push('todoList/todoListsApi');
routeFilenames.push('task/tasksApi');
routeFilenames.push('comment/commentsApi');