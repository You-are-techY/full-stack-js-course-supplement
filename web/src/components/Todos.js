import React from 'react';
import Item from './Item';

class Todos extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null 
      , isLoaded: false 
      , items: []
      , newItemText: ""
    }
    this._handleTextChange = this._handleTextChange.bind(this);
    this._handleAddItem = this._handleAddItem.bind(this);
    this._handleCheckbox = this._handleCheckbox.bind(this);
    this._clearItem = this._clearItem.bind(this);
  }

  componentDidMount() {
    fetch("/api/todos")
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true 
          , items: result.todos 
        })
      }, error => {
        /**
         * Note: it's important to handle errors here
         * instead of a catch() block so that we don't swallow
         * exceptions from actual bugs in components.
         */ 
        this.setState({
          isLoaded: true 
          , error
        })
      })
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
    let newState = {...this.state};
    fetch('/api/todos', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      newState.items.push(data.todo);
      newState.newItemText = '';
      this.setState(newState);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

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
    console.log(this.state);
    return (
      <div>
        <h2>Todos:</h2>
        <ol>
        {this.state.items.map((item,i) => (
          <Item
            changeStatus={this._handleCheckbox}
            key={i}
            index={i}
            item={item}
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

export default Todos;