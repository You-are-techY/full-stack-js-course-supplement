/**
 * View component for /tasks
 *
 * Generic task list view. Defaults to 'all' with:
 * this.props.dispatch(taskActions.fetchListIfNeeded());
 *
 * NOTE: See /product/views/ProductList.js.jsx for more examples
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// import actions
import * as taskActions from '../taskActions';

// import global components
import Binder from '../../../global/components/Binder.js.jsx';

// import resource components
import TaskLayout from '../components/TaskLayout.js.jsx';
import TaskListItem from '../components/TaskListItem.js.jsx';

class TaskList extends Binder {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // fetch a list of your choice
    this.props.dispatch(taskActions.fetchListIfNeeded('all')); // defaults to 'all'
  }

  render() {
    const { taskStore } = this.props;

    /**
     * Retrieve the list information and the list items for the component here.
     *
     * NOTE: if the list is deeply nested and/or filtered, you'll want to handle
     * these steps within the mapStoreToProps method prior to delivering the
     * props to the component.  Othwerwise, the render() action gets convoluted
     * and potentially severely bogged down.
     */

    // get the taskList meta info here so we can reference 'isFetching'
    const taskList = taskStore.util.getListInfo("all");

    /**
     * use the reducer getList utility to convert the all.items array of ids
     * to the actual task objetcs
     */
    const taskListItems = taskStore.util.getList("all");

    /**
     * NOTE: isEmpty is is usefull when the component references more than one
     * resource list.
     */
    const isEmpty = (
      !taskListItems
      || !taskList
    );

    const isFetching = (
      !taskListItems
      || !taskList
      || taskList.isFetching
    )

    return (
      <TaskLayout>
        <h1> Task List </h1>
        <hr/>
        <Link to={'/tasks/new'}> New Task </Link>
        <br/>
        { isEmpty ?
          (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          :
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <ul>
              {taskListItems.map((task, i) =>
                <TaskListItem key={task._id + i} task={task} />
              )}
            </ul>
          </div>
        }
      </TaskLayout>
    )
  }
}

TaskList.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    taskStore: store.task
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(TaskList)
);
