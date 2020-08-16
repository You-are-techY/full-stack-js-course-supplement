/**
 * View component for /admin/todo-lists/new
 *
 * Creates a new todoList from a copy of the defaultItem in the todoList reducer
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { history, withRouter } from 'react-router-dom';

// import third-party libraries
import _ from 'lodash';

// import actions
import * as todoListActions from '../../todoListActions';

// import global components
import Binder from '../../../../global/components/Binder.js.jsx';
import Breadcrumbs from '../../../../global/components/navigation/Breadcrumbs.js.jsx';

// import resource components
import AdminTodoListForm from '../components/AdminTodoListForm.js.jsx';
import AdminTodoListLayout from '../components/AdminTodoListLayout.js.jsx';

class AdminCreateTodoList extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      todoList: _.cloneDeep(this.props.defaultTodoList.obj)
      // NOTE: We don't want to actually change the store's defaultItem, just use a copy
      , formHelpers: {}
      /**
       * NOTE: formHelpers are useful for things like radio controls and other
       * things that manipulate the form, but don't directly effect the state of
       * the todoList
       */
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(todoListActions.fetchDefaultTodoList());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      todoList: _.cloneDeep(nextProps.defaultTodoList.obj)

    })
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


  _handleFormSubmit(e) {
    const { dispatch, history } = this.props;
    e.preventDefault();
    dispatch(todoListActions.sendCreateTodoList(this.state.todoList)).then(todoListRes => {
      if(todoListRes.success) {
        dispatch(todoListActions.invalidateList());
        history.push(`/admin/todo-lists/${todoListRes.item._id}`)
      } else {
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const { location, match } = this.props;
    const { todoList, formHelpers } = this.state;
    const isEmpty = !todoList;
    return (
      <AdminTodoListLayout>
        <Breadcrumbs links={location.state.breadcrumbs} />
        { isEmpty ?
          <h2> Loading...</h2>
          :
          <AdminTodoListForm
            todoList={todoList}
            cancelLink="/admin/todo-lists"
            formHelpers={formHelpers}
            formTitle="Create Todo List"
            formType="create"
            handleFormChange={this._handleFormChange}
            handleFormSubmit={this._handleFormSubmit}
            />
        }
      </AdminTodoListLayout>
    )
  }
}

AdminCreateTodoList.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
   * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
   * differentiated from the React component's internal state
   */

  // manipulate store items here

  return {
    defaultTodoList: store.todoList.defaultItem
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(AdminCreateTodoList)
);
