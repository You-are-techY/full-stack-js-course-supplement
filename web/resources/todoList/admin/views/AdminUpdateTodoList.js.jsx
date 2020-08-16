/**
 * View component for /admin/todo-lists/:todoListId/update
 *
 * Updates a single todoList from a copy of the selcted todoList
 * as defined in the todoList reducer
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

class AdminUpdateTodoList extends Binder {
  constructor(props) {
    super(props);
    const { match, todoListStore } = this.props;
    this.state = {
      todoList: todoListStore.byId[match.params.todoListId] ?  _.cloneDeep(todoListStore.byId[match.params.todoListId]) : {}
      // NOTE: ^ we don't want to change the store, just make changes to a copy
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
    const { dispatch, match } = this.props;
    dispatch(todoListActions.fetchSingleIfNeeded(match.params.todoListId))
  }

  componentWillReceiveProps(nextProps) {
    const { match, todoListStore } = nextProps;
    this.setState({
      todoList: todoListStore.byId[match.params.todoListId] ?  _.cloneDeep(todoListStore.byId[match.params.todoListId]) : {}
      // NOTE: ^ we don't want to actually change the store's todoList, just use a copy
    })
  }

  _handleFormChange(e) {
    const newState = _.update(_.cloneDeep(this.state), e.target.name, () => {
      return e.target.value;
    });
    this.setState(newState);
  }

  _handleFormSubmit(e) {
    const { dispatch, history } = this.props;
    e.preventDefault();
    dispatch(todoListActions.sendUpdateTodoList(this.state.todoList)).then(todoListRes => {
      if(todoListRes.success) {
        history.push(`/admin/todo-lists/${todoListRes.item._id}`)
      } else {
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const {
      location
      , match
      , todoListStore
    } = this.props;
    const { todoList, formHelpers } = this.state;

    const selectedTodoList = todoListStore.selected.getItem();

    const isEmpty = (
      !todoList
      || !todoList._id
    );

    const isFetching = (
      !todoListStore.selected.id
      || todoListStore.selected.isFetching
    )

    return  (
      <AdminTodoListLayout>
        <Breadcrumbs links={location.state.breadcrumbs} />
        { isEmpty ?
          (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          :
          <AdminTodoListForm
            todoList={todoList}
            cancelLink={`/admin/todo-lists/${todoList._id}`}
            formHelpers={formHelpers}
            formTitle="Update Todo List"
            formType="update"
            handleFormChange={this._handleFormChange}
            handleFormSubmit={this._handleFormSubmit}
          />
        }
      </AdminTodoListLayout>
    )
  }
}

AdminUpdateTodoList.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
   * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
   * differentiated from the React component's internal state
   */

  return {
    todoListStore: store.todoList
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(AdminUpdateTodoList)
);
