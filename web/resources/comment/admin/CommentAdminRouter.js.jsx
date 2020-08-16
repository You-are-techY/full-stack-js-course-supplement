/**
 * Sets up the routing for all Comment views.
 *
 * NOTE: As an example, we've included two other Route Components that protect a given
 * path: LoginRoute and RoleRoute
 *
 * LoginRoute simply checks if the user is logged in and if NOT, it redirects
 * them to the login page.
 *
 * RoleRoute protects the path to make sure the user is A) logged in and B) has
 * role matching the path=/admin/comments.
 */

// import primary libraries
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

// import global components
import Binder from '../../../global/components/Binder.js.jsx';
import YTRoute from '../../../global/components/routing/YTRoute.js.jsx';

// import comment views
import AdminCreateComment from './views/AdminCreateComment.js.jsx';
import AdminCommentList from './views/AdminCommentList.js.jsx';
import AdminSingleComment from './views/AdminSingleComment.js.jsx';
import AdminUpdateComment from './views/AdminUpdateComment.js.jsx';

class CommentAdminRouter extends Binder {
  constructor(props) {
    super(props);
  }

  render() {
    let singleCommentPath = this.props.location.pathname.replace('/update', '');
    return (
      <Switch>
        <YTRoute
          breadcrumbs={[{display: 'Dashboard', path: '/admin'}, {display: 'All comments', path: null }]}
          component={AdminCommentList}
          exact
          path="/admin/comments"
          role="admin"
        />
        <YTRoute
          breadcrumbs={[{display: 'Dashboard', path: '/admin'}, {display: 'All comments', path: '/admin/comments'}, {display: 'New ', path: null}]}
          component={AdminCreateComment}
          exact
          path="/admin/comments/new"
          role="admin"
        />
        <YTRoute
          breadcrumbs={[{display: 'Dashboard', path: '/admin'}, {display: 'All comments', path: '/admin/comments'}, {display: 'Comment details', path: null}]}
          component={AdminSingleComment}
          exact
          path="/admin/comments/:commentId"
          role="admin"
        />
        <YTRoute
          breadcrumbs={[{display: 'Dashboard', path: '/admin'}, {display: 'All comments', path: '/admin/comments'}, {display: 'Comment Details', path: singleCommentPath}, {display: 'Update', path: null}]}
          component={AdminUpdateComment}
          exact
          path="/admin/comments/:commentId/update"
          role="admin"
        />
      </Switch>
    )
  }
}

export default CommentAdminRouter;
