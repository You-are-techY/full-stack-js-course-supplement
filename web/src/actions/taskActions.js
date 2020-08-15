/*****
SINGLE TASK CRUD ACTIONS GO HERE
getById, create, update, delete, etc
*****/

// import api utility
import apiUtils from '../utils/api'

// SINGLE TASK ACTIONS

const shouldFetchSingle = (state, id) => {
  console.log("do we need to fetch this dodo?");
  const { map, selected } = state.task;
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

export const INVALIDATE_SELECTED_TASK = "INVALIDATE_SELECTED_TASK"
export function invaldiateSelected() {
  return {
    type: INVALIDATE_SELECTED_TASK
  }
}

export const fetchSingleIfNeeded = (id) => (dispatch, getState) => {
  if (shouldFetchSingle(getState(), id)) {
    console.log("SHOULD FETCH!");
    return dispatch(fetchSingleTaskById(id))
  } else {
    console.log("DON'T NEED TO FETCH");
  }
}

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
  console.log("fetching");
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
  console.log("RECEIVE_CREATE_TASK");
  console.log(json);
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
  console.log("sendCreateTask")
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

//TASK LIST ACTIONS

const shouldFetchList = (state, type) => {
  console.log("shouldFetchList");
  //types: "all", "published", etc
  const list = state.task.lists[type];
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


export const REQUEST_TASK_LIST_BY_TODOS = "REQUEST_TASK_LIST_BY_TODOS"
function requestTaskListByTodoList() {
  console.log('requesting tasks list')
  return {
    type: REQUEST_TASK_LIST_BY_TODOS
  }
}

export const RECEIVE_TASK_LIST_BY_TODOS = "RECEIVE_TASK_LIST_BY_TODOS"
function receiveTaskListByTodoList(json) {
  return {
    type: RECEIVE_TASK_LIST_BY_TODOS
    , list: json.tasks
    , success: json.success
    , error: json.message
    , receivedAt: Date.now()
  }
}

export function fetchTasksByTodoList(todoListId) {
  // console.log("FETCH TASK LIST");
  return dispatch => {
    dispatch(requestTaskListByTodoList())
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
      .then(json => dispatch(receiveTaskListByTodoList(json)))
  }
}

//MORE LIST TYPES HERE


//LIST UTIL METHODS
export const SET_TASK_FILTER = "SET_TASK_FILTER"
export function setFilter(listType, filter) {
  return {
    type: SET_TASK_FILTER
    , filter
    , listType
  }
}

export const SET_TASK_SORT = "SET_TASK_SORT"
export function setSortBy(listType, sortBy) {
  return {
    type: SET_TASK_SORT
    , sortBy
    , listType
  }
}

export const SET_TASK_QUERY = "SET_TASK_QUERY"
export function setQuery(listType, query) {
  return {
    type: SET_TASK_QUERY
    , query
    , listType
  }
}

export const SET_TASK_PAGINATION = "SET_TASK_PAGINATION"
export function setPagination(listType, pagination) {
  return {
    type: SET_TASK_PAGINATION
    , pagination
    , listType
  }
}

export const INVALIDATE_TASK_LIST = "INVALIDATE_TASK_LIST"
export function invaldiateList(listType) {
  return {
    type: INVALIDATE_TASK_LIST
    , listType
  }
} 