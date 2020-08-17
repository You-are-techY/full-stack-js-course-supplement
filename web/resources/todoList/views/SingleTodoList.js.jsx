/**
 * View component for /todo-lists/:todoListId
 *
 * Displays a single todoList from the 'byId' map in the todoList reducer
 * as defined by the 'selected' property
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// import actions
import * as todoListActions from '../todoListActions';
import * as taskActions from '../../task/taskActions';

// import global components
import Binder from '../../../global/components/Binder.js.jsx';
import Breadcrumbs from '../../../global/components/navigation/Breadcrumbs.js.jsx';

// import resource components
import TaskForm from '../../task/components/TaskForm.js.jsx';
import TaskListItem from '../../task/components/TaskListItem.js.jsx';
import TodoListLayout from '../components/TodoListLayout.js.jsx';

class SingleTodoList extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      showTaskForm: false 
      , task: {
        text: ""
        , notes: ""
      }
    }
    this._bind(
      '_handleFormChange'
      , '_handleNewTask'
    )
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(todoListActions.fetchSingleIfNeeded(match.params.todoListId));
    dispatch(taskActions.fetchListIfNeeded('_todoList', match.params.todoListId));
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

  _handleNewTask(e) {
    e.preventDefault();
    const { dispatch, match } = this.props;
    let newTask = {...this.state.task}
    newTask._todoList = match.params.todoListId
    dispatch(taskActions.sendCreateTask(newTask)).then(res => {
      if(res.success) {
        dispatch(taskActions.addTaskToList(res.item, '_todoList', match.params.todoListId))
        this.setState({
          showTaskForm: false
          , task: {text: "", notes: ""}
        });
      } else {
        alert("something wrong, check logs");
      }
    })
  }

  render() {
    const { 
      defaultTask
      , location
      , match 
      , taskStore 
      , todoListStore 
    } = this.props;


    /**
     * use the selected.getItem() utility to pull the actual todoList object from the map
     */
    const selectedTodoList = todoListStore.selected.getItem();

    // fetch task list 
    const taskListItems = taskStore.util.getList('_todoList', match.params.todoListId);
    const taskList = taskStore.util.getListInfo('_todoList', match.params.todoListId);

    const isEmpty = (
      !selectedTodoList
      || !selectedTodoList._id
      || todoListStore.selected.didInvalidate
    );

    const isFetching = (
      todoListStore.selected.isFetching
    )

    const tasksEmpty = (
      !taskListItems
      || !taskList
    );

    const tasksFetching = (
      !taskListItems
      || !taskList
      || taskList.isFetching
    )

    return (
      <TodoListLayout>
        <Breadcrumbs links={location.state.breadcrumbs} />
        { isEmpty ?
          (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          :
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Link className="yt-btn x-small link u-pullRight" to={`${this.props.match.url}/update`}> Update </Link>
            <h1> { selectedTodoList.name }</h1>
            <p>{selectedTodoList.description}</p>
            <hr/>
            <h3>Tasks:</h3>
            { tasksEmpty ?
              <em>No tasks yet.</em>
              :
              taskListItems.map((task, i) => 
                <TaskListItem
                  key={task._id}
                  task={task}
                />
              )
            }
            <br/>
            { this.state.showTaskForm ?
              <TaskForm
                task={this.state.task}
                cancel={() => this.setState({showTaskForm: false, task: {text: "", notes:""}})}
                formTitle="Add Task"
                formType="create"
                handleFormChange={this._handleFormChange}
                handleFormSubmit={this._handleNewTask}
              />
              :
              <button className="yt-btn x-small" onClick={() => this.setState({showTaskForm: true})}>Add task</button>
            }
          </div>
        }
      </TodoListLayout>
    )
  }
}

SingleTodoList.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    defaultTask: store.task.defaultItem
    , taskStore: store.task 
    , todoListStore: store.todoList
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(SingleTodoList)
);
