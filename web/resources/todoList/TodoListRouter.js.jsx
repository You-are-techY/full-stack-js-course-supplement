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

class TodoListRouter extends Binder {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <YTRoute exact path="/todo-lists" component={TodoListList} />
        <YTRoute exact login={true} path="/todo-lists/new" component={CreateTodoList} />
        <YTRoute exact path="/todo-lists/:todoListId" component={SingleTodoList}/>
        <YTRoute exact login={true} path="/todo-lists/:todoListId/update" component={UpdateTodoList}/>
      </Switch>
    )
  }
}

export default TodoListRouter;
