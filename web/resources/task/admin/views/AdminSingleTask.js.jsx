/**
 * View component for /admin/tasks/:taskId
 *
 * Displays a single task from the 'byId' map in the task reducer
 * as defined by the 'selected' property
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// import actions
import * as taskActions from '../../taskActions';

// import global components
import Binder from '../../../../global/components/Binder.js.jsx';
import Breadcrumbs from '../../../../global/components/navigation/Breadcrumbs.js.jsx';

// import resource components
import AdminTaskLayout from '../components/AdminTaskLayout.js.jsx';


class AdminSingleTask extends Binder {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(taskActions.fetchSingleIfNeeded(match.params.taskId));
  }

  render() {
    const { location, taskStore } = this.props;

    /**
     * use the selected.getItem() utility to pull the actual task object from the map
     */
    const selectedTask = taskStore.selected.getItem();

    const isEmpty = (
      !selectedTask
      || !selectedTask._id
      || taskStore.selected.didInvalidate
    );

    const isFetching = (
      taskStore.selected.isFetching
    )

    return (
      <AdminTaskLayout>
        <Breadcrumbs links={location.state.breadcrumbs} />
        <h3> Single Task </h3>
        { isEmpty ?
          (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          :
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <h1> { selectedTask.name }
            </h1>
            <hr/>
            <p> <em>Other characteristics about the Task would go here.</em></p>
            <br/>
            <Link to={`${this.props.match.url}/update`}> Update Task </Link>
          </div>
        }
      </AdminTaskLayout>
    )
  }
}

AdminSingleTask.propTypes = {
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
  )(AdminSingleTask)
);
