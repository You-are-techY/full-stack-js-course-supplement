/*****
SINGLE TODO CRUD ACTIONS GO HERE
getById, create, update, delete, etc
*****/

// import api utility
import apiUtils from '../utils/api'

// SINGLE TODO ACTIONS

const shouldFetchSingle = (state, id) => {
  console.log("do we need to fetch this dodo?");
  const { map, selected } = state.todo;
  if(selected.id !== id) {
    console.log("this is different from selected in the reducer. yes, let's fetch.");
    return true;
  } else if(!map[id]) {
    console.log("this ID is not in the map. yes, let's fetch.");
    return true;
  } else if(selected.isFetching) {
    console.log("we're already fetching this id. no, do not fetch.");
    return false;
  } else {
    console.log("if the selected reducer has been invalidated, fetch. if not, don't fetch.");
    return selected.didInvalidate;
  }
}

export const INVALIDATE_SELECTED_TODO = "INVALIDATE_SELECTED_TODO"
export function invaldiateSelected() {
  return {
    type: INVALIDATE_SELECTED_TODO
  }
}

export const fetchSingleIfNeeded = (id) => (dispatch, getState) => {
  if (shouldFetchSingle(getState(), id)) {
    console.log("SHOULD FETCH!");
    return dispatch(fetchSingleTodoById(id))
  } else {
    console.log("DON'T NEED TO FETCH");
  }
}

export const REQUEST_SINGLE_TODO = "REQUEST_SINGLE_TODO";
function requestSingleTodo(id) {
  return {
    type: REQUEST_SINGLE_TODO
    , id
  }
}

export const RECEIVE_SINGLE_TODO = "RECEIVE_SINGLE_TODO";
function receiveSingleTodo(json) {
  console.log("received", json.todo._id);
  return {
    type: RECEIVE_SINGLE_TODO
    , id: json.todo._id
    , item: json.todo
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchSingleTodoById(todoId) {
  console.log("fetching");
  return dispatch => {
    dispatch(requestSingleTodo(todoId))
    return apiUtils.callAPI(`/api/todos/${todoId}`)
      .then(json => dispatch(receiveSingleTodo(json)))
  }
}

export const ADD_SINGLE_TODO_TO_MAP = "ADD_SINGLE_TODO_TO_MAP";
export function addSingleTodoToMap(item) {
  return {
    type: ADD_SINGLE_TODO_TO_MAP
    , item
  }
}

export const REQUEST_CREATE_TODO = "REQUEST_CREATE_TODO";
function requestCreateTodo(todo) {
  return {
    type: REQUEST_CREATE_TODO
    , todo
  }
}

export const RECEIVE_CREATE_TODO = "RECEIVE_CREATE_TODO";
function receiveCreateTodo(json) {
  console.log("RECEIVE_CREATE_TODO");
  console.log(json);
  return {
    type: RECEIVE_CREATE_TODO
    , id: json.todo ? json.todo._id : null
    , item: json.todo
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendCreateTodo(data) {
  console.log("sendCreateTodo")
  return dispatch => {
    dispatch(requestCreateTodo(data))
    return apiUtils.callAPI(`/api/todos`, 'POST', data)
      .then(json => dispatch(receiveCreateTodo(json)))
  }
}

export const REQUEST_UPDATE_TODO = "REQUEST_UPDATE_TODO";
function requestUpdateTodo(todo) {
  return {
    type: REQUEST_UPDATE_TODO
    , todo
  }
}

export const RECEIVE_UPDATE_TODO = "RECEIVE_UPDATE_TODO";
function receiveUpdateTodo(json) {
  return {
    type: RECEIVE_UPDATE_TODO
    , id: json.todo ? json.todo._id : null
    , item: json.todo
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendUpdateTodo(data) {
  return dispatch => {
    dispatch(requestUpdateTodo(data))
    return apiUtils.callAPI(`/api/todos/${data._id}`, 'PUT', data)
    .then(json => dispatch(receiveUpdateTodo(json)))
  }
}

export const REQUEST_DELETE_TODO = "REQUEST_DELETE_TODO";
function requestDeleteTodo(todoId) {
  return {
    type: REQUEST_DELETE_TODO
    , todoId
  }
}

export const RECEIVE_DELETE_TODO = "RECEIVE_DELETE_TODO";
function receiveDeleteTodo(json) {
  return {
    type: RECEIVE_DELETE_TODO
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendDelete(id) {
  return dispatch => {
    dispatch(requestDeleteTodo(id))
    return apiUtils.callAPI(`/api/todos/${id}`, 'DELETE')
    .then(json => dispatch(receiveDeleteTodo(json)))
  }
}

//TODO LIST ACTIONS

const shouldFetchList = (state, type) => {
  console.log("shouldFetchList");
  //types: "all", "published", etc
  const list = state.todo.lists[type];
  if(!list || !list.items) {
    console.log("ERROR: CANNOT FIND LIST TYPE: " + type);
  } else if(list.items.length < 1) {
    console.log("shouldFetch debug 0");
    return true
  } else if(list.isFetching) {
    console.log("shouldFetch debug 1");
    return false
  } else {
    console.log("shouldFetch debug 2");
    return list.didInvalidate;
  }
}


export const fetchListIfNeeded = (type, id) => (dispatch, getState) => {
  if (shouldFetchList(getState(), type)) {
    if(type === "all") {
      return dispatch(fetchList());
    // } else if(type === "test") {
    //   //example with an additional byId argument
    //   return dispatch(fetchListByTest(id));
    } else {
      console.log("NO MATCHING LIST TYPE SPECIFIED");
      return false; //what to return here?
    }
  }
}

export const REQUEST_TODO_LIST = "REQUEST_TODO_LIST"
function requestTodoList() {
  console.log('requesting todos list')
  return {
    type: REQUEST_TODO_LIST
  }
}

export const RECEIVE_TODO_LIST = "RECEIVE_TODO_LIST"
function receiveTodoList(json) {
  return {
    type: RECEIVE_TODO_LIST
    , list: json.todos
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchList() {
  // console.log("FETCH TODO LIST");
  return dispatch => {
    dispatch(requestTodoList())
    return apiUtils.callAPI(`/api/todos`)
      .then(json => {
        if(json.success) {
          var itemMap = {};
          for(var i = 0; i < json.todos.length; i++) {
            itemMap[json.todos[i]._id] = json.todos[i];
          }
          json.itemMap = itemMap;
          return json;

        } else {
          //do something with the error
          return json;
        }
      })
      .then(json => dispatch(receiveTodoList(json)))
  }
}

//MORE LIST TYPES HERE


//LIST UTIL METHODS
export const SET_TODO_FILTER = "SET_TODO_FILTER"
export function setFilter(listType, filter) {
  return {
    type: SET_TODO_FILTER
    , filter
    , listType
  }
}

export const SET_TODO_SORT = "SET_TODO_SORT"
export function setSortBy(listType, sortBy) {
  return {
    type: SET_TODO_SORT
    , sortBy
    , listType
  }
}

export const SET_TODO_QUERY = "SET_TODO_QUERY"
export function setQuery(listType, query) {
  return {
    type: SET_TODO_QUERY
    , query
    , listType
  }
}

export const SET_TODO_PAGINATION = "SET_TODO_PAGINATION"
export function setPagination(listType, pagination) {
  return {
    type: SET_TODO_PAGINATION
    , pagination
    , listType
  }
}

export const INVALIDATE_TODO_LIST = "INVALIDATE_TODO_LIST"
export function invaldiateList(listType) {
  return {
    type: INVALIDATE_TODO_LIST
    , listType
  }
} 