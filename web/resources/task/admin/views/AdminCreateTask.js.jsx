/**
 * View component for /admin/tasks/new
 *
 * Creates a new task from a copy of the defaultItem in the task reducer
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { history, withRouter } from 'react-router-dom';

// import third-party libraries
import _ from 'lodash';

// import actions
import * as taskActions from '../../taskActions';

// import global components
import Binder from '../../../../global/components/Binder.js.jsx';
import Breadcrumbs from '../../../../global/components/navigation/Breadcrumbs.js.jsx';

// import resource components
import AdminTaskForm from '../components/AdminTaskForm.js.jsx';
import AdminTaskLayout from '../components/AdminTaskLayout.js.jsx';

class AdminCreateTask extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      task: _.cloneDeep(this.props.defaultTask.obj)
      // NOTE: We don't want to actually change the store's defaultItem, just use a copy
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
    const { dispatch } = this.props;
    dispatch(taskActions.fetchDefaultTask());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      task: _.cloneDeep(nextProps.defaultTask.obj)

    })
  }
  _handleFormChange(e) {
    /**
     * This let's us change arbitrarily nested objects with one pass
     */
    const newState = _.update(_.cloneDeep(this.state), e.target.name, () => {
      return e.target.value;
    });
    this.setState(newState);
  }


  _handleFormSubmit(e) {
    const { dispatch, history } = this.props;
    e.preventDefault();
    dispatch(taskActions.sendCreateTask(this.state.task)).then(taskRes => {
      if(taskRes.success) {
        dispatch(taskActions.invalidateList());
        history.push(`/admin/tasks/${taskRes.item._id}`)
      } else {
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const { location, match } = this.props;
    const { task, formHelpers } = this.state;
    const isEmpty = !task;
    return (
      <AdminTaskLayout>
        <Breadcrumbs links={location.state.breadcrumbs} />
        { isEmpty ?
          <h2> Loading...</h2>
          :
          <AdminTaskForm
            task={task}
            cancelLink="/admin/tasks"
            formHelpers={formHelpers}
            formTitle="Create Task"
            formType="create"
            handleFormChange={this._handleFormChange}
            handleFormSubmit={this._handleFormSubmit}
            />
        }
      </AdminTaskLayout>
    )
  }
}

AdminCreateTask.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
   * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
   * differentiated from the React component's internal state
   */

  // manipulate store items here

  return {
    defaultTask: store.task.defaultItem
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(AdminCreateTask)
);
