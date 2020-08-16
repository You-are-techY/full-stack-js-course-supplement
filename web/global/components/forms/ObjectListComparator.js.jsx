import React from 'react';
import PropTypes from 'prop-types';
import Binder from '../Binder.js.jsx';

// import third-party libraries
import _ from 'lodash';
import ReactTooltip from 'react-tooltip';

// import form components
import TextInput from './TextInput.js.jsx';

class ObjectListComparator extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      queryText: ''
    }
    this._bind(
      '_addItem'
      , '_addAll'
      , '_handleFormChange'
      , '_moveDown'
      , '_moveUp'
      , '_removeItem'
      , '_removeAll'
    )
  }

  _removeItem(index) {
    // remove from "items" list
    // console.log("REMOVE " + index);
    let selected = this.props.selected;
    selected.splice(index, 1);
    let event = {target: {name: this.props.name, value: this.props.selected} };
    this.props.change(event);
  }

  _removeAll() {
    let selected = this.props.selected
    selected.splice(0, selected.length)
    let event = {target: {name: this.props.name, value: this.props.selected} };
    this.props.change(event);
  }

  _addItem(index) {
    // console.log("ADD", index);
    const { queryText } = this.state;
    const { displayKey, items, filterable, selected, valueKey } = this.props;
    // filter items first
    let filteredItems = [];
    if(filterable) {
      filteredItems = _.filter(items, function(item) {
        let itemsString = "";
        itemsString += item[displayKey];
        itemsString = itemsString.replace(/[^a-zA-Z0-9]/g, '');
        return itemsString.toLowerCase().indexOf(queryText.toLowerCase()) > -1;
      });
    } else {
      filteredItems = items;
    }
    // add to "items" list
    let newSelected = selected;
    let unselectedItems = [];
    for(let i = 0; i < filteredItems.length; i++) {
      let isSelected = false;
      for(let j = 0; j < selected.length; j++) {
        if(filteredItems[i][valueKey] == selected[j]) {
          isSelected = true;
        }
      }
      if(!isSelected) {
        unselectedItems.push(filteredItems[i]);
      }
    }
    newSelected.push(unselectedItems[index][valueKey]);
    let event = {target: {name: this.props.name, value: newSelected} };
    this.props.change(event);
  }

  _addAll() {
    const { items, selected, valueKey } = this.props;
    let newSelected = selected 
    for (let i = 0; i < items.length; i++) {
      if(!newSelected.includes(items[i][valueKey])) {
        newSelected.push(items[i][valueKey])
      }
    }
    let event = {target: {name: this.props.name, value: newSelected} };
    this.props.change(event);
  }

  _moveUp(index) {
    if(index < 1) { return; }
    let newSelected = this.props.selected;
    let moveTarget = newSelected[index];
    newSelected[index] = newSelected[index - 1];
    newSelected[index - 1] = moveTarget;
    let changeEvent = {
      target: {
        name: this.props.name
        , value: newSelected
      }
    }
    this.props.change(changeEvent);
  }

  _moveDown(index) {
    // console.log("move down", index, this.props.selected.length);
    if(index >= this.props.selected.length - 1) { return; }
    let newSelected = this.props.selected;
    let moveTarget = newSelected[index];
    newSelected[index] = newSelected[index + 1];
    newSelected[index + 1] = moveTarget;
    let changeEvent = {
      target: {
        name: this.props.name
        , value: newSelected
      }
    }
    this.props.change(changeEvent);
  }

  _handleFormChange(e) {
    const newState = _.update(_.cloneDeep(this.state), e.target.name, () => {
      return e.target.value;
    });
    this.setState(newState);
  }

  render() {
    // console.log("object list comparator rendering");
    const {
      addLabel
      , addRemoveAll
      , availableLabel
      , displayKey
      , filterable
      , items
      , label
      , removeLabel
      , reorderable
      , selected
      , selectedLabel
      , tooltipText
      , valueKey
    } = this.props;
    const { queryText } = this.state;
    const tooltipId = Math.floor(Math.random()*16777215).toString(16);

    let filteredItems = [];
    if(filterable) {
      filteredItems = _.filter(items, function(item) {
        let itemsString = "";
        itemsString += item[displayKey];
        itemsString = itemsString.replace(/[^a-zA-Z0-9]/g, '');
        return itemsString.toLowerCase().indexOf(queryText.toLowerCase()) > -1;
      });
    } else {
      filteredItems = items;
    }

    let selectedItems = [];
    let unselectedItems = [];
    for(let i = 0; i < filteredItems.length; i++) {
      let isSelected = false;
      for(let j = 0; j < selected.length; j++) {
        if(filteredItems[i][valueKey] == selected[j]) {
          isSelected = true;
        }
      }
      if(!isSelected) {
        unselectedItems.push(filteredItems[i]);
      }
    }
    // order matters for selected items
    for(let i = 0; i < selected.length; i++) {
      for(let j = 0; j < filteredItems.length; j++) {
        if(selected[i] == filteredItems[j][valueKey]) {
          selectedItems.push(filteredItems[j]);
        }
      }
    }

    return (
      <div className="input-group">
        <label htmlFor="newItem">
        { label }
        { tooltipText ?
          <span>
            <sup><i className="fa fa-info-circle" style={{paddingLeft: '.5em'}} data-tip data-for={tooltipId} /></sup>
            <ReactTooltip
              aria-haspopup='true'
              className="yt-tooltip"
              id={tooltipId}
              place="top"
              type="dark"
            >
              <p>{tooltipText}</p>
            </ReactTooltip>
          </span>
          : null
        }
        </label>
        <div className="list-comparator-input">
          <div className="yt-row with-gutters">
            { filterable ?
              <div className="yt-col _100">
                <TextInput
                  name="queryText"
                  label="Filter"
                  value={queryText}
                  change={this._handleFormChange}
                  placeholder="Filter"
                  required={false}
                />
              </div>
              :
              <div className="yt-col _100"></div>
            }
          </div>
          <div className="yt-row with-gutters">
            <div className="yt-col _50">
              <div className="-label">{selectedLabel + ':'}</div>
              { addRemoveAll ?
                <button
                  type="button"
                  className="yt-btn link info x-small"
                  onClick={() => this._removeAll()}
                >
                  {removeLabel}
                </button>
                : null
              }
                
              <div className="-list-items">
                { selectedItems.map((item, i) => {
                  return(
                    <div key={i}  className="-item  -left">
                      <div className="text">
                        {item[displayKey] + "    "}
                      </div>
                      { i > 0 && reorderable ?
                        <button
                          type="button"
                          className="yt-btn link primary x-small"
                          onClick={() => this._moveUp(i)}
                        >
                          <i className="fa fa-chevron-up"/>
                        </button>
                        : null
                      }
                      { i < (items.length -1) && selectedItems.length > 1  && reorderable ?
                        <button
                          type="button"
                          className="yt-btn link primary x-small"
                          onClick={() => this._moveDown(i)}
                        >
                          <i className="fa fa-chevron-down"/>
                        </button>
                        : null
                      }
                      <button
                        type="button"
                        className="yt-btn link danger x-small"
                        onClick={() => this._removeItem(i)}
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="yt-col _50">
              <div className="-label">{availableLabel + ':'}</div>
              { addRemoveAll ?
                <button
                  type="button"
                  className="yt-btn link info x-small"
                  onClick={() => this._addAll()}
                >
                  {addLabel ? addLabel : 'Add All'}
                </button>
                : null
              }
              <div className="-list-items ">
                { unselectedItems.map((item, i) => {
                  return(
                    <div key={i}  className="-item -right" onClick={() => this._addItem(i)}>
                      <i className="fa fa-arrow-circle-left"></i>
                      <div className="-text">
                        {"    " + item[displayKey]}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ObjectListComparator.propTypes = {
  addLabel: PropTypes.string
  , addRemoveAll: PropTypes.bool
  , availableLabel: PropTypes.string
  , change: PropTypes.func.isRequired
  , displayKey: PropTypes.string.isRequired // key to display on objects
  , filterable: PropTypes.bool
  , items: PropTypes.oneOfType([
    PropTypes.array
    , PropTypes.object
  ]).isRequired // all possible items
  , label: PropTypes.string
  , name: PropTypes.string.isRequired // name of field on parent to update
  , removeLabel: PropTypes.string
  , reorderable: PropTypes.bool
  , selected: PropTypes.arrayOf(PropTypes.string) // array of [valueKey's]
  , selectedLabel: PropTypes.string
  , tooltipText: PropTypes.string
  , valueKey: PropTypes.string.isRequired // key to return as selected
}

ObjectListComparator.defaultProps = {
  availableLabel: "Available"
  , filterable: false
  , items: []
  , label: ""
  , removeLabel: "Remove All"
  , reorderable: false
  , selectedLabel: "Selected"
}

export default ObjectListComparator;