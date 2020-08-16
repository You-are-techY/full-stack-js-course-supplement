/**
 * Reusable stateless form component for Comment
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import form components
import { TextInput } from '../../../../global/components/forms';

const  AdminCommentForm = ({
  cancelLink
  , formHelpers
  , formTitle
  , formType
  , handleFormChange
  , handleFormSubmit
  , comment
}) => {

  // set the button text
  const buttonText = formType === "create" ? "Create Comment" : "Update Comment";

  // set the form header
  const header = formTitle ? <div className="formHeader"><h2> {formTitle} </h2><hr/></div> : <div/>;

  return (
    <div className="yt-container">
      <div className="yt-row center-horiz">
        <div className="form-container -slim">
          <form name="commentForm" className="comment-form" onSubmit={handleFormSubmit}>
            {header}
            <TextInput
              change={handleFormChange}
              label="Name"
              name="comment.name"
              placeholder="Name (required)"
              required={true}
              value={comment.name}
            />
            <div className="input-group">
              <div className="yt-row space-between">
                <Link className="yt-btn link" to={cancelLink}>Cancel</Link>
                <button className="yt-btn " type="submit" > {buttonText} </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

AdminCommentForm.propTypes = {
  cancelLink: PropTypes.string.isRequired
  , formHelpers: PropTypes.object
  , formTitle: PropTypes.string
  , formType: PropTypes.string.isRequired
  , handleFormChange: PropTypes.func.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , comment: PropTypes.object.isRequired
}

AdminCommentForm.defaultProps = {
  formHelpers: {}
  , formTitle: ''
}

export default AdminCommentForm;
