/**
 * View component for /comments
 *
 * Generic comment list view. Defaults to 'all' with:
 * this.props.dispatch(commentActions.fetchListIfNeeded());
 *
 * NOTE: See /product/views/ProductList.js.jsx for more examples
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
import CommentListItem from '../components/CommentListItem.js.jsx';

class CommentList extends Binder {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // fetch a list of your choice
    this.props.dispatch(commentActions.fetchListIfNeeded('all')); // defaults to 'all'
  }

  render() {
    const { commentStore } = this.props;

    /**
     * Retrieve the list information and the list items for the component here.
     *
     * NOTE: if the list is deeply nested and/or filtered, you'll want to handle
     * these steps within the mapStoreToProps method prior to delivering the
     * props to the component.  Othwerwise, the render() action gets convoluted
     * and potentially severely bogged down.
     */

    // get the commentList meta info here so we can reference 'isFetching'
    const commentList = commentStore.util.getListInfo("all");

    /**
     * use the reducer getList utility to convert the all.items array of ids
     * to the actual comment objetcs
     */
    const commentListItems = commentStore.util.getList("all");

    /**
     * NOTE: isEmpty is is usefull when the component references more than one
     * resource list.
     */
    const isEmpty = (
      !commentListItems
      || !commentList
    );

    const isFetching = (
      !commentListItems
      || !commentList
      || commentList.isFetching
    )

    return (
      <CommentLayout>
        <h1> Comment List </h1>
        <hr/>
        <Link to={'/comments/new'}> New Comment </Link>
        <br/>
        { isEmpty ?
          (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          :
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <ul>
              {commentListItems.map((comment, i) =>
                <CommentListItem key={comment._id + i} comment={comment} />
              )}
            </ul>
          </div>
        }
      </CommentLayout>
    )
  }
}

CommentList.propTypes = {
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
  )(CommentList)
);
