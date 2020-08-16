// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TodoListListItem = ({
  todoList
}) => {
  return (
    <li>
      <Link to={`/todo-lists/${todoList._id}`}> {todoList.name}</Link>
    </li>
  )
}

TodoListListItem.propTypes = {
  todoList: PropTypes.object.isRequired
}

export default TodoListListItem;
