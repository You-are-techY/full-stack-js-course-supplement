/**
 * Reusable stateless form component for Task
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import form components
import { TextInput, TextAreaInput } from '../../../global/components/forms';

const  TaskForm = ({
  cancel
  , formHelpers
  , formTitle
  , formType
  , handleFormChange
  , handleFormSubmit
  , task
}) => {

  // set the button text
  const buttonText = formType === "create" ? "Create Task" : "Update Task";

  // set the form header
  const header = formTitle ? <div className="formHeader"><h2> {formTitle} </h2></div> : <div/>;

  return (
    <div className="yt-container">
      <div className="yt-row center-horiz">
        <div className="form-container -slim">
          <form name="taskForm" className="task-form" onSubmit={handleFormSubmit}>
            {header}
            <TextInput
              change={handleFormChange}
              name="task.text"
              placeholder="Describe this task"
              required={true}
              value={task.text || ""}
            />
            <TextAreaInput
              change={handleFormChange}
              name="task.notes"
              placeholder="Add extra details about this task"
              required={false}
              value={task.notes || ""}
            />
            <div className="input-group">
              <div className="yt-row space-between">
                <button className="yt-btn link" onClick={cancel}>Cancel</button>
                <button className="yt-btn " type="submit" > {buttonText} </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

TaskForm.propTypes = {
  cancel: PropTypes.func.isRequired
  , formHelpers: PropTypes.object
  , formTitle: PropTypes.string
  , formType: PropTypes.string.isRequired
  , handleFormChange: PropTypes.func.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , task: PropTypes.object.isRequired
}

TaskForm.defaultProps = {
  formHelpers: {}
  , formTitle: ''
}

export default TaskForm;
