/**
 * Reusable stateless form component for TodoList
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import form components
import { TextInput } from '../../../../global/components/forms';

const  AdminTodoListForm = ({
  cancelLink
  , formHelpers
  , formTitle
  , formType
  , handleFormChange
  , handleFormSubmit
  , todoList
}) => {

  // set the button text
  const buttonText = formType === "create" ? "Create Todo List" : "Update Todo List";

  // set the form header
  const header = formTitle ? <div className="formHeader"><h2> {formTitle} </h2><hr/></div> : <div/>;

  return (
    <div className="yt-container">
      <div className="yt-row center-horiz">
        <div className="form-container -slim">
          <form name="todoListForm" className="todoList-form" onSubmit={handleFormSubmit}>
            {header}
            <TextInput
              change={handleFormChange}
              label="Name"
              name="todoList.name"
              placeholder="Name (required)"
              required={true}
              value={todoList.name}
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

AdminTodoListForm.propTypes = {
  cancelLink: PropTypes.string.isRequired
  , formHelpers: PropTypes.object
  , formTitle: PropTypes.string
  , formType: PropTypes.string.isRequired
  , handleFormChange: PropTypes.func.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , todoList: PropTypes.object.isRequired
}

AdminTodoListForm.defaultProps = {
  formHelpers: {}
  , formTitle: ''
}

export default AdminTodoListForm;
