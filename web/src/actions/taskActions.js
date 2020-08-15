// import api utility
import apiUtils from '../utils/api'

/**
 * Single Task CRUD actions 
 */

export const REQUEST_SINGLE_TASK = "REQUEST_SINGLE_TASK";
function requestSingleTask(id) {
  return {
    type: REQUEST_SINGLE_TASK
    , id
  }
}

export const RECEIVE_SINGLE_TASK = "RECEIVE_SINGLE_TASK";
function receiveSingleTask(json) {
  console.log("received", json.task._id);
  return {
    type: RECEIVE_SINGLE_TASK
    , id: json.task._id
    , item: json.task
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchSingleTaskById(taskId) {
  return dispatch => {
    dispatch(requestSingleTask(taskId))
    return apiUtils.callAPI(`/api/tasks/${taskId}`)
      .then(json => dispatch(receiveSingleTask(json)))
  }
}

export const ADD_SINGLE_TASK_TO_MAP = "ADD_SINGLE_TASK_TO_MAP";
export function addSingleTaskToMap(item) {
  return {
    type: ADD_SINGLE_TASK_TO_MAP
    , item
  }
}

export const REQUEST_CREATE_TASK = "REQUEST_CREATE_TASK";
function requestCreateTask(task) {
  return {
    type: REQUEST_CREATE_TASK
    , task
  }
}

export const RECEIVE_CREATE_TASK = "RECEIVE_CREATE_TASK";
function receiveCreateTask(json) {
  return {
    type: RECEIVE_CREATE_TASK
    , id: json.task ? json.task._id : null
    , item: json.task
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendCreateTask(data) {
  return dispatch => {
    dispatch(requestCreateTask(data))
    return apiUtils.callAPI(`/api/tasks`, 'POST', data)
      .then(json => dispatch(receiveCreateTask(json)))
  }
}

export const REQUEST_UPDATE_TASK = "REQUEST_UPDATE_TASK";
function requestUpdateTask(task) {
  return {
    type: REQUEST_UPDATE_TASK
    , task
  }
}

export const RECEIVE_UPDATE_TASK = "RECEIVE_UPDATE_TASK";
function receiveUpdateTask(json) {
  return {
    type: RECEIVE_UPDATE_TASK
    , id: json.task ? json.task._id : null
    , item: json.task
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendUpdateTask(data) {
  return dispatch => {
    dispatch(requestUpdateTask(data))
    return apiUtils.callAPI(`/api/tasks/${data._id}`, 'PUT', data)
    .then(json => dispatch(receiveUpdateTask(json)))
  }
}

export const REQUEST_DELETE_TASK = "REQUEST_DELETE_TASK";
function requestDeleteTask(taskId) {
  return {
    type: REQUEST_DELETE_TASK
    , taskId
  }
}

export const RECEIVE_DELETE_TASK = "RECEIVE_DELETE_TASK";
function receiveDeleteTask(json) {
  return {
    type: RECEIVE_DELETE_TASK
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function sendDelete(id) {
  return dispatch => {
    dispatch(requestDeleteTask(id))
    return apiUtils.callAPI(`/api/tasks/${id}`, 'DELETE')
    .then(json => dispatch(receiveDeleteTask(json)))
  }
}

/**
 * TASK LIST ACTIONS
 */ 
export const REQUEST_TASK_LIST = "REQUEST_TASK_LIST"
function requestTaskList() {
  console.log('requesting tasks list')
  return {
    type: REQUEST_TASK_LIST
  }
}

export const RECEIVE_TASK_LIST = "RECEIVE_TASK_LIST"
function receiveTaskList(json) {
  return {
    type: RECEIVE_TASK_LIST
    , list: json.tasks
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchList() {
  // console.log("FETCH TASK LIST");
  return dispatch => {
    dispatch(requestTaskList())
    return apiUtils.callAPI(`/api/tasks`)
      .then(json => {
        if(json.success) {
          var itemMap = {};
          for(var i = 0; i < json.tasks.length; i++) {
            itemMap[json.tasks[i]._id] = json.tasks[i];
          }
          json.itemMap = itemMap;
          return json;

        } else {
          //do something with the error
          return json;
        }
      })
      .then(json => dispatch(receiveTaskList(json)))
  }
}

/**
 * MORE LIST TYPES HERE
 */ 

export const REQUEST_TASK_LIST_BY_TODO = "REQUEST_TASK_LIST_BY_TODO"
function requestTaskListByTodoList(todoListId) {
  console.log('requesting tasks list')
  return {
    type: REQUEST_TASK_LIST_BY_TODO
    , todoListId
  }
}

export const RECEIVE_TASK_LIST_BY_TODO = "RECEIVE_TASK_LIST_BY_TODO"
function receiveTaskListByTodoList(json, todoListId) {
  return {
    type: RECEIVE_TASK_LIST_BY_TODO
    , list: json.tasks
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
    , todoListId
  }
}

export function fetchTasksByTodoList(todoListId) {
  // console.log("FETCH TASK LIST");
  return dispatch => {
    dispatch(requestTaskListByTodoList(todoListId))
    return apiUtils.callAPI(`/api/tasks/by-todo-list/${todoListId}`)
      .then(json => {
        if(json.success) {
          var itemMap = {};
          for(var i = 0; i < json.tasks.length; i++) {
            itemMap[json.tasks[i]._id] = json.tasks[i];
          }
          json.itemMap = itemMap;
          return json;

        } else {
          //do something with the error
          return json;
        }
      })
      .then(json => dispatch(receiveTaskListByTodoList(json, todoListId)))
  }
}
