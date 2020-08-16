// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TaskListItem = ({
  task
}) => {
  return (
    <li>
      <Link to={`/tasks/${task._id}`}> {task.name}</Link>
    </li>
  )
}

TaskListItem.propTypes = {
  task: PropTypes.object.isRequired
}

export default TaskListItem;
