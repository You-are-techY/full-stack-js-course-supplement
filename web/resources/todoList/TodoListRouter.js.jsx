/**
 * Set up routing for all TodoList views
 *
 * For an example with protected routes, refer to /product/ProductRouter.js.jsx
 */

// import primary libraries
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import global components
import Binder from '../../global/components/Binder.js.jsx';
import YTRoute from '../../global/components/routing/YTRoute.js.jsx';

// import todoList views
import CreateTodoList from './views/CreateTodoList.js.jsx';
import TodoListList from './views/TodoListList.js.jsx';
import SingleTodoList from './views/SingleTodoList.js.jsx';
import UpdateTodoList from './views/UpdateTodoList.js.jsx';

// import task views 
import SingleTask from '../task/views/SingleTask.js.jsx';

class TodoListRouter extends Binder {
  constructor(props) {
    super(props);
  }

  render() {
    let singleTodoListPath = this.props.location.pathname.replace('/update', '');
    return (
      <Switch>
        <YTRoute 
          breadcrumbs={[{display: 'My todos', path: null}]}
          component={TodoListList} 
          exact 
          login={true} 
          path="/todo-lists" 
        />
        <YTRoute 
          breadcrumbs={[{display: 'My todos', path: '/todo-lists'}, {display: 'New', path: null}]}
          component={CreateTodoList} 
          exact 
          login={true} 
          path="/todo-lists/new" 
        />
        <YTRoute 
          breadcrumbs={[{display: 'My todos', path: '/todo-lists'}, {display: 'List details', path: null}]}
          component={SingleTodoList}
          exact 
          login={true} 
          path="/todo-lists/:todoListId" 
        />
        <YTRoute 
          breadcrumbs={[{display: 'My todos', path: '/todo-lists'}, {display: 'List details', path: singleTodoListPath}, {display: 'Update', path: null}]}
          component={UpdateTodoList}
          exact 
          login={true} 
          path="/todo-lists/:todoListId/update" 
        />
        <YTRoute 
          breadcrumbs={[{display: 'My todos', path: '/todo-lists'}, {display: 'List details', path: singleTodoListPath}, {display: 'Task info', path: null}]}
          component={SingleTask}
          exact 
          login={true} 
          path="/todo-lists/:todoListId/task/:taskId" 
        />
      </Switch>
    )
  }
}

export default TodoListRouter;
