// import api utility
import apiUtils from '../utils/api'

/**
 * Single TodoList CRUD actions 
 */
export const REQUEST_SINGLE_TODO_LIST = "REQUEST_SINGLE_TODO_LIST";
function requestSingleTodoList(id) {
  return {
    type: REQUEST_SINGLE_TODO_LIST
    , id
  }
}

export const RECEIVE_SINGLE_TODO_LIST = "RECEIVE_SINGLE_TODO_LIST";
function receiveSingleTodoList(json) {
  console.log("received", json.todoList._id);
  return {
    type: RECEIVE_SINGLE_TODO_LIST
    , id: json.todoList._id
    , item: json.todoList
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchSingleTodoListById(todoListId) {
  console.log("fetching");
  return dispatch => {
    dispatch(requestSingleTodoList(todoListId))
    return apiUtils.callAPI(`/api/todo-lists/${todoListId}`)
      .then(json => dispatch(receiveSingleTodoList(json)))
  }
}

export const ADD_SINGLE_TODO_LIST_TO_MAP = "ADD_SINGLE_TODO_LIST_TO_MAP";
export function addSingleTodoListToMap(item) {
  return {
    type: ADD_SINGLE_TODO_LIST_TO_MAP
    , item
  }
}

export const REQUEST_CREATE_TODO_LIST = "REQUEST_CREATE_TODO_LIST";
function requestCreateTodoList(todoList) {
  return {
    type: REQUEST_CREATE_TODO_LIST
    , todoList
  }
}

export const RECEIVE_CREATE_TODO_LIST = "RECEIVE_CREATE_TODO_LIST";
function receiveCreateTodoList(json) {
  console.log("RECEIVE_CREATE_TODO_LIST");
  console.log(json);
  return {
    type: RECEIVE_CREATE_TODO_LIST
    , id: json.todoList ? json.todoList._id : null
    , item: json.todoList
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendCreateTodoList(data) {
  console.log("sendCreateTodoList")
  return dispatch => {
    dispatch(requestCreateTodoList(data))
    return apiUtils.callAPI(`/api/todo-lists`, 'POST', data)
      .then(json => dispatch(receiveCreateTodoList(json)))
  }
}

export const REQUEST_UPDATE_TODO_LIST = "REQUEST_UPDATE_TODO_LIST";
function requestUpdateTodoList(todoList) {
  return {
    type: REQUEST_UPDATE_TODO_LIST
    , todoList
  }
}

export const RECEIVE_UPDATE_TODO_LIST = "RECEIVE_UPDATE_TODO_LIST";
function receiveUpdateTodoList(json) {
  return {
    type: RECEIVE_UPDATE_TODO_LIST
    , id: json.todoList ? json.todoList._id : null
    , item: json.todoList
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendUpdateTodoList(data) {
  return dispatch => {
    dispatch(requestUpdateTodoList(data))
    return apiUtils.callAPI(`/api/todo-lists/${data._id}`, 'PUT', data)
    .then(json => dispatch(receiveUpdateTodoList(json)))
  }
}

export const REQUEST_DELETE_TODO_LIST = "REQUEST_DELETE_TODO_LIST";
function requestDeleteTodoList(todoListId) {
  return {
    type: REQUEST_DELETE_TODO_LIST
    , todoListId
  }
}

export const RECEIVE_DELETE_TODO_LIST = "RECEIVE_DELETE_TODO_LIST";
function receiveDeleteTodoList(json) {
  return {
    type: RECEIVE_DELETE_TODO_LIST
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendDelete(id) {
  return dispatch => {
    dispatch(requestDeleteTodoList(id))
    return apiUtils.callAPI(`/api/todo-lists/${id}`, 'DELETE')
    .then(json => dispatch(receiveDeleteTodoList(json)))
  }
}

/**
 * TodoList LIST ACTIONS
 */ 

export const REQUEST_TODO_LIST_LIST = "REQUEST_TODO_LIST_LIST"
function requestTodoListList() {
  console.log('requesting todoLists list')
  return {
    type: REQUEST_TODO_LIST_LIST
  }
}

export const RECEIVE_TODO_LIST_LIST = "RECEIVE_TODO_LIST_LIST"
function receiveTodoListList(json) {
  return {
    type: RECEIVE_TODO_LIST_LIST
    , list: json.todoLists
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchList() {
  // console.log("FETCH TODO_LIST LIST");
  return dispatch => {
    dispatch(requestTodoListList())
    return apiUtils.callAPI(`/api/todo-lists`)
      .then(json => {
        if(json.success) {
          var itemMap = {};
          for(var i = 0; i < json.todoLists.length; i++) {
            itemMap[json.todoLists[i]._id] = json.todoLists[i];
          }
          json.itemMap = itemMap;
          return json;

        } else {
          //do something with the error
          return json;
        }
      })
      .then(json => dispatch(receiveTodoListList(json)))
  }
}

/**
 * MORE LIST TYPES HERE
 */ 

