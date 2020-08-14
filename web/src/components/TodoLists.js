// import core libraries 
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import actions 
import { todoListActions } from '../actions';

class TodoLists extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(todoListActions.fetchList());
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