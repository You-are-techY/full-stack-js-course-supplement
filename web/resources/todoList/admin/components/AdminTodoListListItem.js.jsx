// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { DateTime } from 'luxon';

const AdminTodoListListItem = ({
  todoList
}) => {
  return (
    <tr >
      <td><Link to={`/admin/todo-lists/${todoList._id}`}>{todoList.name}</Link></td>
      <td>{DateTime.fromISO(todoList.updated).toLocaleString(DateTime.DATETIME_SHORT)}</td>
      <td className="u-textRight"><Link to={`/admin/todo-lists/${todoList._id}/update`}>Update</Link></td>
    </tr>
  )
}

AdminTodoListListItem.propTypes = {
  todoList: PropTypes.object.isRequired
}

export default AdminTodoListListItem;
