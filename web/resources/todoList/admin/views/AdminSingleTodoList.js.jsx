/**
 * View component for /admin/todo-lists/:todoListId
 *
 * Displays a single todoList from the 'byId' map in the todoList reducer
 * as defined by the 'selected' property
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// import actions
import * as todoListActions from '../../todoListActions';

// import global components
import Binder from '../../../../global/components/Binder.js.jsx';
import Breadcrumbs from '../../../../global/components/navigation/Breadcrumbs.js.jsx';

// import resource components
import AdminTodoListLayout from '../components/AdminTodoListLayout.js.jsx';


class AdminSingleTodoList extends Binder {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(todoListActions.fetchSingleIfNeeded(match.params.todoListId));
  }

  render() {
    const { location, todoListStore } = this.props;

    /**
     * use the selected.getItem() utility to pull the actual todoList object from the map
     */
    const selectedTodoList = todoListStore.selected.getItem();

    const isEmpty = (
      !selectedTodoList
      || !selectedTodoList._id
      || todoListStore.selected.didInvalidate
    );

    const isFetching = (
      todoListStore.selected.isFetching
    )

    return (
      <AdminTodoListLayout>
        <Breadcrumbs links={location.state.breadcrumbs} />
        <h3> Single Todo List </h3>
        { isEmpty ?
          (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          :
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <h1> { selectedTodoList.name }
            </h1>
            <hr/>
            <p> <em>Other characteristics about the TodoList would go here.</em></p>
            <br/>
            <Link to={`${this.props.match.url}/update`}> Update Todo List </Link>
          </div>
        }
      </AdminTodoListLayout>
    )
  }
}

AdminSingleTodoList.propTypes = {
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
  )(AdminSingleTodoList)
);
