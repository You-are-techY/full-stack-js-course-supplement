/**
 * View component for /admin/comments/:commentId/update
 *
 * Updates a single comment from a copy of the selcted comment
 * as defined in the comment reducer
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { history, withRouter } from 'react-router-dom';

// import third-party libraries
import _ from 'lodash';

// import actions
import * as commentActions from '../../commentActions';

// import global components
import Binder from '../../../../global/components/Binder.js.jsx';
import Breadcrumbs from '../../../../global/components/navigation/Breadcrumbs.js.jsx';

// import resource components
import AdminCommentForm from '../components/AdminCommentForm.js.jsx';
import AdminCommentLayout from '../components/AdminCommentLayout.js.jsx';

class AdminUpdateComment extends Binder {
  constructor(props) {
    super(props);
    const { match, commentStore } = this.props;
    this.state = {
      comment: commentStore.byId[match.params.commentId] ?  _.cloneDeep(commentStore.byId[match.params.commentId]) : {}
      // NOTE: ^ we don't want to change the store, just make changes to a copy
      , formHelpers: {}
      /**
       * NOTE: formHelpers are useful for things like radio controls and other
       * things that manipulate the form, but don't directly effect the state of
       * the comment
       */
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(commentActions.fetchSingleIfNeeded(match.params.commentId))
  }

  componentWillReceiveProps(nextProps) {
    const { match, commentStore } = nextProps;
    this.setState({
      comment: commentStore.byId[match.params.commentId] ?  _.cloneDeep(commentStore.byId[match.params.commentId]) : {}
      // NOTE: ^ we don't want to actually change the store's comment, just use a copy
    })
  }

  _handleFormChange(e) {
    const newState = _.update(_.cloneDeep(this.state), e.target.name, () => {
      return e.target.value;
    });
    this.setState(newState);
  }

  _handleFormSubmit(e) {
    const { dispatch, history } = this.props;
    e.preventDefault();
    dispatch(commentActions.sendUpdateComment(this.state.comment)).then(commentRes => {
      if(commentRes.success) {
        history.push(`/admin/comments/${commentRes.item._id}`)
      } else {
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const {
      location
      , match
      , commentStore
    } = this.props;
    const { comment, formHelpers } = this.state;

    const selectedComment = commentStore.selected.getItem();

    const isEmpty = (
      !comment
      || !comment._id
    );

    const isFetching = (
      !commentStore.selected.id
      || commentStore.selected.isFetching
    )

    return  (
      <AdminCommentLayout>
        <Breadcrumbs links={location.state.breadcrumbs} />
        { isEmpty ?
          (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          :
          <AdminCommentForm
            comment={comment}
            cancelLink={`/admin/comments/${comment._id}`}
            formHelpers={formHelpers}
            formTitle="Update Comment"
            formType="update"
            handleFormChange={this._handleFormChange}
            handleFormSubmit={this._handleFormSubmit}
          />
        }
      </AdminCommentLayout>
    )
  }
}

AdminUpdateComment.propTypes = {
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
  )(AdminUpdateComment)
);
