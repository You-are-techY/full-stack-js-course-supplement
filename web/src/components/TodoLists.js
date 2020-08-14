// import core libraries 
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import actions 
import { todoListActions } from '../actions';

class TodoLists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null 
      , newListName: ""
    }
    this._handleTextChange = this._handleTextChange.bind(this);
    this._handleAddList = this._handleAddList.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(todoListActions.fetchList());
  }

  _handleTextChange(event) {
    // console.log(event.target.value);
    this.setState({newListName: event.target.value})
  }
  
  _handleAddList(e) {
    const { dispatch } = this.props;
    e.preventDefault();
    let newList = {
      name: this.state.newListName
    }
    dispatch(todoListActions.sendCreateTodoList(newList)).then(res =>{
      console.log(res); 
      if(res.success) {
        this.setState({newListName: ''});
        dispatch(todoListActions.fetchList());
      } else {
        alert("There was an error:", res.message)
      }
    })
  }

  render() {
    const { todoListStore } = this.props;
    const allItems = todoListStore.list.all.items;
    return (
      <div>
        <h2>Todo Lists:</h2>
        <ul>
        { allItems ? 
          allItems.map((id,i) => (
            <li>{todoListStore.map[id].name}</li>
          ))
          :
          null 
        }
        </ul>
        <input type="text" value={this.state.newListName} onChange={this._handleTextChange} />
        <button type="button" onClick={this._handleAddList}>Add list</button>
      </div>
    )
  }
}

TodoLists.propTypes = {
  dispatch: PropTypes.func.isRequired 
}

const mapStateToProps = (store) => {
  return {
    todoListStore: store.todoListReducer
  }
}

export default connect(mapStateToProps)(TodoLists);