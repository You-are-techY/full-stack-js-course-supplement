// import core libraries 
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import components 
import Item from './Item';

// import actions 
import { todoActions } from '../actions';

class Todos extends React.Component {
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
    this.props.dispatch(todoActions.fetchList());
  }

  
  _clearItem(index) {
    let newState = {...this.state};
    newState.items.splice(index, 1);
    this.setState(newState);
  }
  
  _handleTextChange(event) {
    // console.log(event.target.value);
    this.setState({newItemText: event.target.value})
  }
  
  _handleAddItem(e) {
    e.preventDefault();
    let newItem = {
      text: this.state.newItemText
      , done: false 
    }
    this.props.dispatch(todoActions.sendCreateTodo(newItem)).then(res =>{
      console.log(res); 
      if(res.success) {
        // clear text 
        this.setState({newItemText: ''});
        this.props.dispatch(todoActions.fetchList());
      } else {
        alert("There was an error:", res.message)
      }
    })
  }
  
  _handleCheckbox(e, index) {
    console.log('fire check', e.target.checked)
    let newState = {...this.state};
    // newState.items[index].done = e.target.checked;
    // this.setState(newState);

    let updatedItem = this.state.items[index];
    updatedItem.done = e.target.checked;

    fetch('/api/todos/' + updatedItem._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      newState.items[index].done = data.todo;
      this.setState(newState);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  render() {
    return (
      <div>
        <h2>Todos:</h2>
        <ol>
        {this.props.todoStore.list.all.items.map((id,i) => (
          <Item
            changeStatus={this._handleCheckbox}
            key={i}
            index={i}
            item={this.props.todoStore.map[id]}
            clearItem={this._clearItem}
          />
        ))}
        </ol>
        <input type="text" value={this.state.newItemText} onChange={this._handleTextChange} />
        <button type="button" onClick={this._handleAddItem}>Add item</button>
      </div>
    )
  }
}

Todos.propTypes = {
  dispatch: PropTypes.func.isRequired 
}

const mapStateToProps = (store) => {
  return {
    todoStore: store.todoReducer
  }
}

export default connect(mapStateToProps)(Todos);