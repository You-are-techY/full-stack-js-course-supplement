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
    const { dispatch } = this.props;
    dispatch(todoActions.fetchList());
  }

  
  _clearItem(id) {
    const { dispatch } = this.props;
    dispatch(todoActions.sendDelete(id)).then(res => {
      if(res.success) {
        dispatch(todoActions.fetchList());
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
    dispatch(todoActions.sendCreateTodo(newItem)).then(res =>{
      console.log(res); 
      if(res.success) {
        // clear text 
        this.setState({newItemText: ''});
        dispatch(todoActions.fetchList());
      } else {
        alert("There was an error:", res.message)
      }
    })
  }
  
  _handleCheckbox(id) {
    // console.log('fire check', e.target.checked)
    const { dispatch, todoStore } = this.props;
    let updatedItem = {...todoStore.map[id]} 
    updatedItem.done = !todoStore.map[id].done;
    dispatch(todoActions.sendUpdateTodo(updatedItem)).then(res => {
      console.log(res)
      if(res.success) {
        console.log('success');
      } else {
        alert("error: check logs");
      }
    })
  }
  
  render() {
    const { todoStore } = this.props;
    const allItems = todoStore.list.all.items;
    return (
      <div>
        <h2>Todos:</h2>
        <ol>
        { allItems ? 
          allItems.map((id,i) => (
          <Item
            changeStatus={() => this._handleCheckbox(id)}
            key={i}
            index={i}
            item={todoStore.map[id]}
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

Todos.propTypes = {
  dispatch: PropTypes.func.isRequired 
}

const mapStateToProps = (store) => {
  return {
    todoStore: store.todoReducer
  }
}

export default connect(mapStateToProps)(Todos);