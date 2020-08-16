/**
 * Sets up the routing for all Task views.
 *
 * NOTE: As an example, we've included two other Route Components that protect a given
 * path: LoginRoute and RoleRoute
 *
 * LoginRoute simply checks if the user is logged in and if NOT, it redirects
 * them to the login page.
 *
 * RoleRoute protects the path to make sure the user is A) logged in and B) has
 * role matching the path=/admin/tasks.
 */

// import primary libraries
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

// import global components
import Binder from '../../../global/components/Binder.js.jsx';
import YTRoute from '../../../global/components/routing/YTRoute.js.jsx';

// import task views
import AdminCreateTask from './views/AdminCreateTask.js.jsx';
import AdminTaskList from './views/AdminTaskList.js.jsx';
import AdminSingleTask from './views/AdminSingleTask.js.jsx';
import AdminUpdateTask from './views/AdminUpdateTask.js.jsx';

class TaskAdminRouter extends Binder {
  constructor(props) {
    super(props);
  }

  render() {
    let singleTaskPath = this.props.location.pathname.replace('/update', '');
    return (
      <Switch>
        <YTRoute
          breadcrumbs={[{display: 'Dashboard', path: '/admin'}, {display: 'All tasks', path: null }]}
          component={AdminTaskList}
          exact
          path="/admin/tasks"
          role="admin"
        />
        <YTRoute
          breadcrumbs={[{display: 'Dashboard', path: '/admin'}, {display: 'All tasks', path: '/admin/tasks'}, {display: 'New ', path: null}]}
          component={AdminCreateTask}
          exact
          path="/admin/tasks/new"
          role="admin"
        />
        <YTRoute
          breadcrumbs={[{display: 'Dashboard', path: '/admin'}, {display: 'All tasks', path: '/admin/tasks'}, {display: 'Task details', path: null}]}
          component={AdminSingleTask}
          exact
          path="/admin/tasks/:taskId"
          role="admin"
        />
        <YTRoute
          breadcrumbs={[{display: 'Dashboard', path: '/admin'}, {display: 'All tasks', path: '/admin/tasks'}, {display: 'Task Details', path: singleTaskPath}, {display: 'Update', path: null}]}
          component={AdminUpdateTask}
          exact
          path="/admin/tasks/:taskId/update"
          role="admin"
        />
      </Switch>
    )
  }
}

export default TaskAdminRouter;
