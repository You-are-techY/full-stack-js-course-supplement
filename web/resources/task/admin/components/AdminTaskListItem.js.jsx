// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { DateTime } from 'luxon';

const AdminTaskListItem = ({
  task
}) => {
  return (
    <tr >
      <td><Link to={`/admin/tasks/${task._id}`}>{task.name}</Link></td>
      <td>{DateTime.fromISO(task.updated).toLocaleString(DateTime.DATETIME_SHORT)}</td>
      <td className="u-textRight"><Link to={`/admin/tasks/${task._id}/update`}>Update</Link></td>
    </tr>
  )
}

AdminTaskListItem.propTypes = {
  task: PropTypes.object.isRequired
}

export default AdminTaskListItem;
