// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CommentListItem = ({
  comment
}) => {
  return (
    <li>
      <Link to={`/comments/${comment._id}`}> {comment.name}</Link>
    </li>
  )
}

CommentListItem.propTypes = {
  comment: PropTypes.object.isRequired
}

export default CommentListItem;
