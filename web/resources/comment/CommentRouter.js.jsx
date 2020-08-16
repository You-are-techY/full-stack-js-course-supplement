/**
 * Set up routing for all Comment views
 *
 * For an example with protected routes, refer to /product/ProductRouter.js.jsx
 */

// import primary libraries
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import global components
import Binder from '../../global/components/Binder.js.jsx';
import YTRoute from '../../global/components/routing/YTRoute.js.jsx';

// import comment views
import CreateComment from './views/CreateComment.js.jsx';
import CommentList from './views/CommentList.js.jsx';
import SingleComment from './views/SingleComment.js.jsx';
import UpdateComment from './views/UpdateComment.js.jsx';

class CommentRouter extends Binder {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <YTRoute exact path="/comments" component={CommentList} />
        <YTRoute exact login={true} path="/comments/new" component={CreateComment} />
        <YTRoute exact path="/comments/:commentId" component={SingleComment}/>
        <YTRoute exact login={true} path="/comments/:commentId/update" component={UpdateComment}/>
      </Switch>
    )
  }
}

export default CommentRouter;
