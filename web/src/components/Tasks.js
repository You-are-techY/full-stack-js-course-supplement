// import core libraries 
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import components 
import Item from './Item';

// import actions 
import { taskActions, todoListActions } from '../actions';

class Tasks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null 
      , newItemText: ""
    }
    this._handleTextChange = this._handleTextChange.bind(this);
    this._handleAddItem = this._handleAddItem.bind(this);
    this._handleCheckbox = this._handleCheckbox.bind(this);
    this._clearItem = this._clearItem.bind(this);
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(todoListActions.fetchSingleTodoListById(match.params.todoListId));
  }

  
  _clearItem(id) {
    const { dispatch } = this.props;
    dispatch(taskActions.sendDelete(id)).then(res => {
      if(res.success) {
        dispatch(taskActions.fetchList());
      } else {
        alert("Error: check logs");
      }
    })
  }
  
  _handleTextChange(event) {
    // console.log(event.target.value);
    this.setState({newItemText: event.target.value})
  }
  
  _handleAddItem(e) {
    const { dispatch } = this.props;
    e.preventDefault();
    let newItem = {
      text: this.state.newItemText
      , done: false 
    }
    dispatch(taskActions.sendCreateTask(newItem)).then(res =>{
      console.log(res); 
      if(res.success) {
        // clear text 
        this.setState({newItemText: ''});
        dispatch(taskActions.fetchList());
      } else {
        alert("There was an error:", res.message)
      }
    })
  }
  
  _handleCheckbox(id) {
    // console.log('fire check', e.target.checked)
    const { dispatch, taskStore } = this.props;
    let updatedItem = {...taskStore.map[id]} 
    updatedItem.done = !taskStore.map[id].done;
    dispatch(taskActions.sendUpdateTask(updatedItem)).then(res => {
      console.log(res)
      if(res.success) {
        console.log('success');
      } else {
        alert("error: check logs");
      }
    })
  }
  
  render() {
    const { match, taskStore, todoListStore } = this.props;
    const allItems = taskStore.list.all.items;
    const selectedTodoList = todoListStore.map[match.params.todoListId];
    return (
      <div>
        <h1>{selectedTodoList ? selectedTodoList.name : null}</h1>
        <h3>Tasks:</h3>
        <ol>
        { allItems ? 
          allItems.map((id,i) => (
          <Item
            changeStatus={() => this._handleCheckbox(id)}
            key={i}
            index={i}
            item={taskStore.map[id]}
            clearItem={() => this._clearItem(id)}
          />
          ))
          :
          null 
        }
        </ol>
        <input type="text" value={this.state.newItemText} onChange={this._handleTextChange} />
        <button type="button" onClick={this._handleAddItem}>Add item</button>
      </div>
    )
  }
}

Tasks.propTypes = {
  dispatch: PropTypes.func.isRequired 
}

const mapStateToProps = (store) => {
  return {
    taskStore: store.taskReducer
    , todoListStore: store.todoListReducer
  }
}

export default connect(mapStateToProps)(Tasks);