/**
 * View component for /tasks/:taskId/update
 *
 * Updates a single task from a copy of the selcted task
 * as defined in the task reducer
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { history, withRouter } from 'react-router-dom';

// import third-party libraries
import _ from 'lodash';

// import actions
import * as taskActions from '../taskActions';

// import global components
import Binder from '../../../global/components/Binder.js.jsx';

// import resource components
import TaskForm from '../components/TaskForm.js.jsx';
import TaskLayout from '../components/TaskLayout.js.jsx';

class UpdateTask extends Binder {
  constructor(props) {
    super(props);
    const { match, taskStore } = this.props;
    this.state = {
      task: taskStore.byId[match.params.taskId] ?  _.cloneDeep(taskStore.byId[match.params.taskId]) : {}
      // NOTE: ^ we don't want to change the store, just make changes to a copy
      , formHelpers: {}
      /**
       * NOTE: formHelpers are useful for things like radio controls and other
       * things that manipulate the form, but don't directly effect the state of
       * the task
       */
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(taskActions.fetchSingleIfNeeded(match.params.taskId))
  }

  componentWillReceiveProps(nextProps) {
    const { match, taskStore } = nextProps;
    this.setState({
      task: taskStore.byId[match.params.taskId] ?  _.cloneDeep(taskStore.byId[match.params.taskId]) : {}
      // NOTE: ^ we don't want to actually change the store's task, just use a copy
    })
  }

  _handleFormChange(e) {
    const newState = _.update(_.cloneDeep(this.state), e.target.name, () => {
      return e.target.value;
    });
    this.setState(newState);
  }

  _handleFormSubmit(e) {
    const { dispatch, history } = this.props;
    e.preventDefault();
    dispatch(taskActions.sendUpdateTask(this.state.task)).then(taskRes => {
      if(taskRes.success) {
        history.push(`/tasks/${taskRes.item._id}`)
      } else {
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const {
      location
      , match
      , taskStore
    } = this.props;
    const { task, formHelpers } = this.state;

    const selectedTask = taskStore.selected.getItem();

    const isEmpty = (
      !task
      || !task._id
    );

    const isFetching = (
      !taskStore.selected.id
      || taskStore.selected.isFetching
    )

    return  (
      <TaskLayout>
        { isEmpty ?
          (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          :
          <TaskForm
            task={task}
            cancelLink={`/tasks/${task._id}`}
            formHelpers={formHelpers}
            formTitle="Update Task"
            formType="update"
            handleFormChange={this._handleFormChange}
            handleFormSubmit={this._handleFormSubmit}
          />
        }
      </TaskLayout>
    )
  }
}

UpdateTask.propTypes = {
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
  )(UpdateTask)
);
