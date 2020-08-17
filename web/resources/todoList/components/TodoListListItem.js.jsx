// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { DateTime } from 'luxon';

const TodoListListItem = ({
  todoList
}) => {
  return (
    <div className="yt-col full s_50 m_33 l_25">
      <Link to={`/todo-lists/${todoList._id}`} className="card -bordered -hoverable -linkable -todo-card"> 
        <div className="card-body">
        <small>{DateTime.fromISO(todoList.created).toLocaleString(DateTime.DATE_MED)}</small>
        <div className="-title">
          {todoList.name}
        </div>
        {todoList.description}
        </div>
      </Link>
    </div>
  )
}

TodoListListItem.propTypes = {
  todoList: PropTypes.object.isRequired
}

export default TodoListListItem;
