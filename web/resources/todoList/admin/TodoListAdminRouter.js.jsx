/**
 * Sets up the routing for all Todo List views.
 *
 * NOTE: As an example, we've included two other Route Components that protect a given
 * path: LoginRoute and RoleRoute
 *
 * LoginRoute simply checks if the user is logged in and if NOT, it redirects
 * them to the login page.
 *
 * RoleRoute protects the path to make sure the user is A) logged in and B) has
 * role matching the path=/admin/todo-lists.
 */

// import primary libraries
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

// import global components
import Binder from '../../../global/components/Binder.js.jsx';
import YTRoute from '../../../global/components/routing/YTRoute.js.jsx';

// import todoList views
import AdminCreateTodoList from './views/AdminCreateTodoList.js.jsx';
import AdminTodoListList from './views/AdminTodoListList.js.jsx';
import AdminSingleTodoList from './views/AdminSingleTodoList.js.jsx';
import AdminUpdateTodoList from './views/AdminUpdateTodoList.js.jsx';

class TodoListAdminRouter extends Binder {
  constructor(props) {
    super(props);
  }

  render() {
    let singleTodoListPath = this.props.location.pathname.replace('/update', '');
    return (
      <Switch>
        <YTRoute
          breadcrumbs={[{display: 'Dashboard', path: '/admin'}, {display: 'All todo-lists', path: null }]}
          component={AdminTodoListList}
          exact
          path="/admin/todo-lists"
          role="admin"
        />
        <YTRoute
          breadcrumbs={[{display: 'Dashboard', path: '/admin'}, {display: 'All todo-lists', path: '/admin/todo-lists'}, {display: 'New ', path: null}]}
          component={AdminCreateTodoList}
          exact
          path="/admin/todo-lists/new"
          role="admin"
        />
        <YTRoute
          breadcrumbs={[{display: 'Dashboard', path: '/admin'}, {display: 'All todo-lists', path: '/admin/todo-lists'}, {display: 'Todo List details', path: null}]}
          component={AdminSingleTodoList}
          exact
          path="/admin/todo-lists/:todoListId"
          role="admin"
        />
        <YTRoute
          breadcrumbs={[{display: 'Dashboard', path: '/admin'}, {display: 'All todo-lists', path: '/admin/todo-lists'}, {display: 'Todo List Details', path: singleTodoListPath}, {display: 'Update', path: null}]}
          component={AdminUpdateTodoList}
          exact
          path="/admin/todo-lists/:todoListId/update"
          role="admin"
        />
      </Switch>
    )
  }
}

export default TodoListAdminRouter;
