
class Todos extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
      , newItemText: ""
    }
    this._handleTextChange = this._handleTextChange.bind(this);
    this._handleAddItem = this._handleAddItem.bind(this);
    this._handleCheckbox = this._handleCheckbox.bind(this);
    this._clearItem = this._clearItem.bind(this);
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
    newState.items.push(newItem);
    newState.newItemText = '';
    this.setState(newState);
  }
  
  _handleCheckbox(e, index) {
    console.log('fire check')
    let newState = {...this.state};
    newState.items[index].done = e.target.checked;
    this.setState(newState);
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

// export default Todos;