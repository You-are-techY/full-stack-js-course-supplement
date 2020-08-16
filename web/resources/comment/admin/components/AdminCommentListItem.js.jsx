// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { DateTime } from 'luxon';

const AdminCommentListItem = ({
  comment
}) => {
  return (
    <tr >
      <td><Link to={`/admin/comments/${comment._id}`}>{comment.name}</Link></td>
      <td>{DateTime.fromISO(comment.updated).toLocaleString(DateTime.DATETIME_SHORT)}</td>
      <td className="u-textRight"><Link to={`/admin/comments/${comment._id}/update`}>Update</Link></td>
    </tr>
  )
}

AdminCommentListItem.propTypes = {
  comment: PropTypes.object.isRequired
}

export default AdminCommentListItem;
