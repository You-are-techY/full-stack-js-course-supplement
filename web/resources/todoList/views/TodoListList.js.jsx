/**
 * View component for /todo-lists
 *
 * Generic todoList list view. Defaults to 'all' with:
 * this.props.dispatch(todoListActions.fetchListIfNeeded());
 *
 * NOTE: See /product/views/ProductList.js.jsx for more examples
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// import actions
import * as todoListActions from '../todoListActions';

// import global components
import Binder from '../../../global/components/Binder.js.jsx';

// import resource components
import TodoListLayout from '../components/TodoListLayout.js.jsx';
import TodoListListItem from '../components/TodoListListItem.js.jsx';

class TodoListList extends Binder {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // fetch a list of your choice
    this.props.dispatch(todoListActions.fetchListIfNeeded('all')); // defaults to 'all'
  }

  render() {
    const { todoListStore } = this.props;

    /**
     * Retrieve the list information and the list items for the component here.
     *
     * NOTE: if the list is deeply nested and/or filtered, you'll want to handle
     * these steps within the mapStoreToProps method prior to delivering the
     * props to the component.  Othwerwise, the render() action gets convoluted
     * and potentially severely bogged down.
     */

    // get the todoListList meta info here so we can reference 'isFetching'
    const todoListList = todoListStore.util.getListInfo("all");

    /**
     * use the reducer getList utility to convert the all.items array of ids
     * to the actual todoList objetcs
     */
    const todoListListItems = todoListStore.util.getList("all");

    /**
     * NOTE: isEmpty is is usefull when the component references more than one
     * resource list.
     */
    const isEmpty = (
      !todoListListItems
      || !todoListList
    );

    const isFetching = (
      !todoListListItems
      || !todoListList
      || todoListList.isFetching
    )

    return (
      <TodoListLayout>
        <h1> Todo List List </h1>
        <hr/>
        <Link to={'/todo-lists/new'}> New Todo List </Link>
        <br/>
        { isEmpty ?
          (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          :
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <ul>
              {todoListListItems.map((todoList, i) =>
                <TodoListListItem key={todoList._id + i} todoList={todoList} />
              )}
            </ul>
          </div>
        }
      </TodoListLayout>
    )
  }
}

TodoListList.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    todoListStore: store.todoList
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(TodoListList)
);
