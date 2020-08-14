// export resource API paths
let routeFilenames = [];
module.exports = function(router) {
  routeFilenames.forEach(function(filename) {
    console.log("initialize filename: " + filename);
    require('./resources/' + filename)(router);
  });
}

routeFilenames.push('todoList/todoListsApi');
routeFilenames.push('task/tasksApi');