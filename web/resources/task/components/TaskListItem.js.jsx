// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// import third-party libraries
import classNames from 'classnames';
import { DateTime } from 'luxon';

// import actions
import * as taskActions from '../taskActions'

// import global components
import Binder from '../../../global/components/Binder.js.jsx';
import task from '../taskReducers';


// import module components


class TaskListItem extends Binder {
  constructor(props) {
    super(props);
    this.state = {

    }
    this._bind(
      '_handleToggleDone'
    )
  }

  _handleToggleDone() {
    const { dispatch, task } = this.props;
    let newTask = {...task};
    newTask.status = task.status === 'open' ? 'done' : 'open';
    dispatch(taskActions.sendUpdateTask(newTask))
  }

  render() {
    const {
      match
      , task
    } = this.props;
    
    const checkClass = classNames(
      '-checkbox'
      , { '-done': task.status !== 'open' }
    )

    return (
      <div className="-task-item">
        <div className="-icon">
          <div className={checkClass} onClick={this._handleToggleDone}>
            { task.status === 'open' ? 
              <i className="fal fa-square fa-2x"/>
              :
              <i className="fas fa-check-square fa-2x"/>
            }
          </div>
        </div>
        <div className="-copy">
          <Link to={`${match.url}/task/${task._id}`} className="-text">{task.text}</Link>
          <div className="-notes">{task.notes}</div>
        </div>
      </div>
    )
  }
}

TaskListItem.propTypes = {
  dispatch: PropTypes.func.isRequired
  , task: PropTypes.object.isRequired
}

TaskListItem.defaultProps = {

}


const mapStoreToProps = (store) => {
  /**
   * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
   * differentiated from the React component's internal state
   */
  return {

  }
}

export default withRouter(
    connect(
    mapStoreToProps
  )(TaskListItem)
);
