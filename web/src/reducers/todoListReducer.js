
import { todoListActions } from '../actions';

function todoList(state = {
  map: {} // map of all items

  , selected: { // single selected entity
    id: null
    , isFetching: false
    , error: null
    , didInvalidate: false
    , lastUpdated: null
  }
  , list: {

    all: {
      isFetching: false
      , error: null
      , didInvalidate: false
      , lastUpdated: null
      , items: []
      , pagination: {}
      , filter: {
        type: ''
        , sortBy: ''
        , query: ''
      }
    }
    // add other list here, like "published" or "featured"
    // accessed like "todoList.list.all" or "todoList.list.published"

  }
}, action) {
  let nextState = Object.assign({}, state, {});
  switch(action.type) {
  // SINGLE ITEM ACTIONS
    case todoListActions.REQUEST_SINGLE_TODO_LIST:
      return Object.assign({}, state, {
        selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })
    case todoListActions.RECEIVE_SINGLE_TODO_LIST:
      if(action.success) {
        console.log("Mapping now");
        // add object to map
        let newMap = Object.assign({}, state.map, {});
        newMap[action.id] = action.item;
        return Object.assign({}, state, {
          map: newMap
          , selected: {
            id: action.id
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        })
      } else {
        return Object.assign({}, state, {
          selected: {
            id: action.id
            , isFetching: false
            , error: action.error
            , didInvalidate: true
            , lastUpdated: action.receivedAt
          }
        })
      }

    case todoListActions.ADD_SINGLE_TODO_LIST_TO_MAP:
      var newMap = Object.assign({}, state.map, {}); // copy map
      newMap[action.item._id] = action.item; // add single
      return Object.assign({}, state, {
        map: newMap
      })

    case todoListActions.REQUEST_CREATE_TODO_LIST:
      return Object.assign({}, state, {
        selected: {
          id: null
          , isFetching: true
          , error: null
        }
      })
    case todoListActions.RECEIVE_CREATE_TODO_LIST:
      if(action.success) {
        // add object to map
        let newMap = Object.assign({}, state.map, {});
        newMap[action.id] = action.item;
        return Object.assign({}, state, {
          map: newMap
          , selected: {
            id: action.id
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        })
      } else {
        return Object.assign({}, state, {
          selected: {
            id: action.id
            , isFetching: false
            , error: action.error
            , didInvalidate: true
            , lastUpdated: action.receivedAt
          }
        })
      }

    case todoListActions.REQUEST_UPDATE_TODO_LIST:
      return Object.assign({}, state, {
        selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })

    case todoListActions.RECEIVE_UPDATE_TODO_LIST:
      if(action.success) {
        // add object to map
        let newMap = Object.assign({}, state.map, {});
        newMap[action.id] = action.item;
        return Object.assign({}, state, {
          map: newMap
          , selected: {
            id: action.id
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        })
      } else {
        return Object.assign({}, state, {
          selected: {
            id: action.id
            , isFetching: false
            , error: action.error
            , didInvalidate: true
            , lastUpdated: action.receivedAt
          }
        })
      }

    case todoListActions.REQUEST_DELETE_TODO_LIST:
      return Object.assign({}, state, {
        selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })
    case todoListActions.RECEIVE_DELETE_TODO_LIST:
      if(action.success) {
        // remove object from map
        let newMap = Object.assign({}, state.map, {});
        delete newMap[action.id]; //remove key
        return Object.assign({}, state, {
          map: newMap
          , selected: {
            id: null
            , isFetching: false
            , error: null
            , didInvalidate: false
            , lastUpdated: action.receivedAt
          }
        })
      } else {
        return Object.assign({}, state, {
          selected: {
            id: action.id
            , isFetching: false
            , error: action.error
            , didInvalidate: true
            , lastUpdated: action.receivedAt
          }
        })
      }

    // LIST ACTIONS
    case todoListActions.REQUEST_TODO_LIST_LIST:
      nextState = Object.assign({}, state, {});
      nextState.list.all.isFetching = true;
      nextState.list.all.error = null;
      nextState.list.all.items = [];
      return nextState;
    case todoListActions.RECEIVE_TODO_LIST_LIST:
      nextState = Object.assign({}, state, {});
      if(action.success) {
        // add api array objects to map
        let newMap = Object.assign({}, state.map, {});
        let idArray = [];
        for(var i = 0; i < action.list.length; i++) {
          idArray.push(action.list[i]._id);
          newMap[action.list[i]._id] = action.list[i];
        }
        nextState.list.all.isFetching = false;
        nextState.list.all.error = null;
        nextState.list.all.items = idArray;
        nextState.list.all.didInvalidate = false;
        nextState.list.all.lastUpdated = action.receivedAt
        nextState.map = newMap;
        return nextState;
      } else {
        nextState.list.all.isFetching = false;
        nextState.list.all.error = action.error;
        nextState.list.all.items = [];
        nextState.list.all.didInvalidate = true;
        nextState.list.all.lastUpdated = action.receivedAt
        return nextState;
      }
    default:
      return state
  }
}

export default todoList;