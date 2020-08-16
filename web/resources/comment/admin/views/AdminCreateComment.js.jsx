/**
 * View component for /admin/comments/new
 *
 * Creates a new comment from a copy of the defaultItem in the comment reducer
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

class AdminCreateComment extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      comment: _.cloneDeep(this.props.defaultComment.obj)
      // NOTE: We don't want to actually change the store's defaultItem, just use a copy
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
    const { dispatch } = this.props;
    dispatch(commentActions.fetchDefaultComment());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      comment: _.cloneDeep(nextProps.defaultComment.obj)

    })
  }
  _handleFormChange(e) {
    /**
     * This let's us change arbitrarily nested objects with one pass
     */
    const newState = _.update(_.cloneDeep(this.state), e.target.name, () => {
      return e.target.value;
    });
    this.setState(newState);
  }


  _handleFormSubmit(e) {
    const { dispatch, history } = this.props;
    e.preventDefault();
    dispatch(commentActions.sendCreateComment(this.state.comment)).then(commentRes => {
      if(commentRes.success) {
        dispatch(commentActions.invalidateList());
        history.push(`/admin/comments/${commentRes.item._id}`)
      } else {
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const { location, match } = this.props;
    const { comment, formHelpers } = this.state;
    const isEmpty = !comment;
    return (
      <AdminCommentLayout>
        <Breadcrumbs links={location.state.breadcrumbs} />
        { isEmpty ?
          <h2> Loading...</h2>
          :
          <AdminCommentForm
            comment={comment}
            cancelLink="/admin/comments"
            formHelpers={formHelpers}
            formTitle="Create Comment"
            formType="create"
            handleFormChange={this._handleFormChange}
            handleFormSubmit={this._handleFormSubmit}
            />
        }
      </AdminCommentLayout>
    )
  }
}

AdminCreateComment.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
   * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
   * differentiated from the React component's internal state
   */

  // manipulate store items here

  return {
    defaultComment: store.comment.defaultItem
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(AdminCreateComment)
);
