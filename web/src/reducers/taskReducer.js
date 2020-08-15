
import { taskActions } from '../actions';

function task(state = {
  map: {} //map of all items

  , selected: { //single selected entity
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
    // accessed like "task.list.all" or "task.list.published"
    , todoList: {}
  }
}, action) {
  let nextState = Object.assign({}, state, {});
  switch(action.type) {
    // SINGLE ITEM ACTIONS
    case taskActions.REQUEST_SINGLE_TASK:
      return Object.assign({}, state, {
        selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })
    case taskActions.RECEIVE_SINGLE_TASK:
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

    case taskActions.ADD_SINGLE_TASK_TO_MAP:
      console.log("ADD_SINGLE_TASK_TO_MAP");
      var newMap = Object.assign({}, state.map, {}); // copy map
      newMap[action.item._id] = action.item; // add single
      return Object.assign({}, state, {
        map: newMap
      })

    case taskActions.REQUEST_CREATE_TASK:
      console.log("REQUEST_CREATE_TASK");
      return Object.assign({}, state, {
        selected: {
          id: null
          , isFetching: true
          , error: null
        }
      })
    case taskActions.RECEIVE_CREATE_TASK:
      console.log("RECEIVE_CREATE_TASK");
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

    case taskActions.REQUEST_UPDATE_TASK:
      return Object.assign({}, state, {
        selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })

    case taskActions.RECEIVE_UPDATE_TASK:
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

    case taskActions.REQUEST_DELETE_TASK:
      return Object.assign({}, state, {
        selected: {
          id: action.id
          , isFetching: true
          , error: null
        }
      })
    case taskActions.RECEIVE_DELETE_TASK:
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
    case taskActions.REQUEST_TASK_LIST:
      nextState = Object.assign({}, state, {});
      nextState.list.all.isFetching = true;
      nextState.list.all.error = null;
      nextState.list.all.items = [];
      return nextState;
    case taskActions.RECEIVE_TASK_LIST:
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
    case taskActions.REQUEST_TASK_LIST_BY_TODO:
      nextState = Object.assign({}, state, {});
      // set the object 
      nextState.list.todoList[action.todoListId] = {
        isFetching: true
        , error: null
        , items: []
      }
      return nextState;
    case taskActions.RECEIVE_TASK_LIST_BY_TODO:
      nextState = Object.assign({}, state, {});
      if(action.success) {
        // add api array objects to map
        let newMap = Object.assign({}, state.map, {});
        let idArray = [];
        for(var i = 0; i < action.list.length; i++) {
          idArray.push(action.list[i]._id);
          newMap[action.list[i]._id] = action.list[i];
        }
        nextState.list.todoList[action.todoListId].isFetching = false;
        nextState.list.todoList[action.todoListId].error = null;
        nextState.list.todoList[action.todoListId].items = idArray;
        nextState.list.todoList[action.todoListId].didInvalidate = false;
        nextState.list.todoList[action.todoListId].lastUpdated = action.receivedAt
        nextState.map = newMap;
        return nextState;
      } else {
        nextState.list.todoList[action.todoListId].isFetching = false;
        nextState.list.todoList[action.todoListId].error = action.error;
        nextState.list.todoList[action.todoListId].items = [];
        nextState.list.todoList[action.todoListId].didInvalidate = true;
        nextState.list.todoList[action.todoListId].lastUpdated = action.receivedAt
        return nextState;
      }

    default:
      return state
  }
}

export default task;