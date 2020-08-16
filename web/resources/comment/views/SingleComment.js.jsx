/**
 * View component for /comments/:commentId
 *
 * Displays a single comment from the 'byId' map in the comment reducer
 * as defined by the 'selected' property
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// import actions
import * as commentActions from '../commentActions';

// import global components
import Binder from '../../../global/components/Binder.js.jsx';

// import resource components
import CommentLayout from '../components/CommentLayout.js.jsx';


class SingleComment extends Binder {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(commentActions.fetchSingleIfNeeded(match.params.commentId));
  }

  render() {
    const { commentStore } = this.props;

    /**
     * use the selected.getItem() utility to pull the actual comment object from the map
     */
    const selectedComment = commentStore.selected.getItem();

    const isEmpty = (
      !selectedComment
      || !selectedComment._id
      || commentStore.selected.didInvalidate
    );

    const isFetching = (
      commentStore.selected.isFetching
    )

    return (
      <CommentLayout>
        <h3> Single Comment </h3>
        { isEmpty ?
          (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          :
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <h1> { selectedComment.name }
            </h1>
            <hr/>
            <p> <em>Other characteristics about the Comment would go here.</em></p>
            <br/>
            <Link to={`${this.props.match.url}/update`}> Update Comment </Link>
          </div>
        }
      </CommentLayout>
    )
  }
}

SingleComment.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    commentStore: store.comment
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(SingleComment)
);
