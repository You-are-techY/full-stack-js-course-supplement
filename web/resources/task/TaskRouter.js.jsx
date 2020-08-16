/**
 * Set up routing for all Task views
 *
 * For an example with protected routes, refer to /product/ProductRouter.js.jsx
 */

// import primary libraries
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import global components
import Binder from '../../global/components/Binder.js.jsx';
import YTRoute from '../../global/components/routing/YTRoute.js.jsx';

// import task views
import CreateTask from './views/CreateTask.js.jsx';
import TaskList from './views/TaskList.js.jsx';
import SingleTask from './views/SingleTask.js.jsx';
import UpdateTask from './views/UpdateTask.js.jsx';

class TaskRouter extends Binder {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <YTRoute exact path="/tasks" component={TaskList} />
        <YTRoute exact login={true} path="/tasks/new" component={CreateTask} />
        <YTRoute exact path="/tasks/:taskId" component={SingleTask}/>
        <YTRoute exact login={true} path="/tasks/:taskId/update" component={UpdateTask}/>
      </Switch>
    )
  }
}

export default TaskRouter;
