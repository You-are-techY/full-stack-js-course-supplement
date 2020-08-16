// import api utility
import apiUtils from '../utils/api'

/**
 * Single Todo CRUD actions 
 */

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

/**
 * Todo LIST ACTIONS
 */ 

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

/**
 * More list typs will go here
 */

