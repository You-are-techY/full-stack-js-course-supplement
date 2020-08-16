/**
 * All comment CRUD actions
 *
 * Actions are payloads of information that send data from the application
 * (i.e. Yote server) to the store. They are the _only_ source of information
 * for the store.
 *
 * NOTE: In Yote, we try to keep actions and reducers dealing with CRUD payloads
 * in terms of 'item' or 'items'. This keeps the action payloads consistent and
 * aides various scoping issues with list management in the reducers.
 */

// import api utility
import apiUtils from '../../global/utils/api'

const shouldFetchSingle = (state, id) => {
  /**
   * This is helper method to determine whether we should fetch a new single
   * user object from the server, or if a valid one already exists in the store
   *
   * NOTE: Uncomment console logs to help debugging
   */
  // console.log("shouldFetch single");
  const { byId, selected } = state.comment;
  if(selected.id !== id) {
    // the "selected" id changed, so we _should_ fetch
    // console.log("Y shouldFetch - true: id changed");
    return true;
  } else if(selected.isFetching) {
    // "selected" is already fetching, don't do anything
    // console.log("Y shouldFetch - false: isFetching");
    return false;
  } else if(!byId[id] && !selected.error) {
    // the id is not in the map, fetch from server
    // however, if the api returned an error, then it SHOULDN'T be in the map
    // so re-fetching it will result in an infinite loop
    // console.log("Y shouldFetch - true: not in map");
    return true;
  } else if(new Date().getTime() - selected.lastUpdated > (1000 * 60 * 5)) {
    // it's been longer than 5 minutes since the last fetch, get a new one
    // console.log("Y shouldFetch - true: older than 5 minutes");
    // also, don't automatically invalidate on server error. if server throws an error,
    // that won't change on subsequent requests and we will have an infinite loop
    return true;
  } else {
    // if "selected" is invalidated, fetch a new one, otherwise don't
    // console.log("Y shouldFetch - " + selected.didInvalidate + ": didInvalidate");
    return selected.didInvalidate;
  }
}

export const INVALIDATE_SELECTED_COMMENT = "INVALIDATE_SELECTED_COMMENT"
export function invalidateSelected() {
  return {
    type: INVALIDATE_SELECTED_COMMENT
  }
}

export const fetchSingleIfNeeded = (id) => (dispatch, getState) => {
  if (shouldFetchSingle(getState(), id)) {
    return dispatch(fetchSingleCommentById(id))
  } else {
    return dispatch(returnSingleCommentPromise(id)); // return promise that contains comment
  }
}


export const returnSingleCommentPromise = (id) => (dispatch, getState) => {
  /**
   * This returns the object from the map so that we can do things with it in
   * the component.
   *
   * For the "fetchIfNeeded()" functionality, we need to return a promised object
   * EVEN IF we don't need to fetch it. this is because if we have any .then()'s
   * in the components, they will fail when we don't need to fetch.
   */
  return new Promise((resolve) => {
    resolve({
      id: id
      , item: getState().comment.byId[id]
      , success: true
      , type: "RETURN_SINGLE_COMMENT_WITHOUT_FETCHING"
    })
  });
}

export const REQUEST_SINGLE_COMMENT = "REQUEST_SINGLE_COMMENT";
function requestSingleComment(id) {
  return {
    id
    , type: REQUEST_SINGLE_COMMENT
  }
}

export const RECEIVE_SINGLE_COMMENT = "RECEIVE_SINGLE_COMMENT";
function receiveSingleComment(json) {
  return {
    error: json.message
    , id: json.comment ? json.comment._id : null
    , item: json.comment
    , receivedAt: Date.now()
    , success: json.success
    , type: RECEIVE_SINGLE_COMMENT
  }
}

export function fetchSingleCommentById(id) {
  return dispatch => {
    dispatch(requestSingleComment(id))
    return apiUtils.callAPI(`/api/comments/${id}`)
      .then(json => dispatch(receiveSingleComment(json)))
  }
}

export const ADD_SINGLE_COMMENT_TO_MAP = "ADD_SINGLE_COMMENT_TO_MAP";
export function addSingleCommentToMap(item) {
  return {
    item
    , type: ADD_SINGLE_COMMENT_TO_MAP
  }
}

export const SET_SELECTED_COMMENT = "SET_SELECTED_COMMENT";
export function setSelectedComment(item) {
  return {
    type: SET_SELECTED_COMMENT
    , item
  }
}

export const REQUEST_DEFAULT_COMMENT = "REQUEST_DEFAULT_COMMENT";
function requestDefaultComment(id) {
  return {
    type: REQUEST_DEFAULT_COMMENT
  }
}

export const RECEIVE_DEFAULT_COMMENT = "RECEIVE_DEFAULT_COMMENT";
function receiveDefaultComment(json) {
  return {
    error: json.message
    , defaultObj: json.defaultObj
    , receivedAt: Date.now()
    , success: json.success
    , type: RECEIVE_DEFAULT_COMMENT
  }
}

export function fetchDefaultComment() {
  return dispatch => {
    dispatch(requestDefaultComment())
    return apiUtils.callAPI(`/api/comments/default`)
      .then(json => dispatch(receiveDefaultComment(json)))
  }
}

export const REQUEST_COMMENT_SCHEMA = "REQUEST_COMMENT_SCHEMA";
function requestCommentSchema(id) {
  return {
    type: REQUEST_COMMENT_SCHEMA
  }
}
 export const RECEIVE_COMMENT_SCHEMA = "RECEIVE_COMMENT_SCHEMA";
function receiveCommentSchema(json) {
  return {
    error: json.message
    , schema: json.schema
    , receivedAt: Date.now()
    , success: json.success
    , type: RECEIVE_COMMENT_SCHEMA
  }
}
 export function fetchCommentSchema() {
  return dispatch => {
    dispatch(requestCommentSchema())
    return apiUtils.callAPI(`/api/comments/schema`)
      .then(json => dispatch(receiveCommentSchema(json)))
  }
}

export const REQUEST_CREATE_COMMENT = "REQUEST_CREATE_COMMENT";
function requestCreateComment(comment) {
  return {
    comment
    , type: REQUEST_CREATE_COMMENT
  }
}

export const RECEIVE_CREATE_COMMENT = "RECEIVE_CREATE_COMMENT";
function receiveCreateComment(json) {
  return {
    error: json.message
    , id: json.comment ? json.comment._id : null
    , item: json.comment
    , receivedAt: Date.now()
    , success: json.success
    , type: RECEIVE_CREATE_COMMENT
  }
}

export function sendCreateComment(data) {
  return dispatch => {
    dispatch(requestCreateComment(data))
    return apiUtils.callAPI('/api/comments', 'POST', data)
      .then(json => dispatch(receiveCreateComment(json)))
  }
}

export const REQUEST_UPDATE_COMMENT = "REQUEST_UPDATE_COMMENT";
function requestUpdateComment(comment) {
  return {
    id: comment ? comment._id: null
    , comment
    , type: REQUEST_UPDATE_COMMENT
  }
}

export const RECEIVE_UPDATE_COMMENT = "RECEIVE_UPDATE_COMMENT";
function receiveUpdateComment(json) {
  return {
    error: json.message
    , id: json.comment ? json.comment._id : null
    , item: json.comment
    , receivedAt: Date.now()
    , success: json.success
    , type: RECEIVE_UPDATE_COMMENT
  }
}

export function sendUpdateComment(data) {
  return dispatch => {
    dispatch(requestUpdateComment(data))
    return apiUtils.callAPI(`/api/comments/${data._id}`, 'PUT', data)
      .then(json => dispatch(receiveUpdateComment(json)))
  }
}

export const REQUEST_DELETE_COMMENT = "REQUEST_DELETE_COMMENT";
function requestDeleteComment(id) {
  return {
    id
    , type: REQUEST_DELETE_COMMENT
  }
}

export const RECEIVE_DELETE_COMMENT = "RECEIVE_DELETE_COMMENT";
function receiveDeleteComment(id, json) {
  return {
    error: json.message
    , id
    , receivedAt: Date.now()
    , success: json.success
    , type: RECEIVE_DELETE_COMMENT
  }
}

export function sendDelete(id) {
  return dispatch => {
    dispatch(requestDeleteComment(id))
    return apiUtils.callAPI(`/api/comments/${id}`, 'DELETE')
      .then(json => dispatch(receiveDeleteComment(id, json)))
  }
}


/**
 * LIST ACTIONS
 */

const findListFromArgs = (state, listArgs) => {
  /**
   * Helper method to find appropriate list from listArgs.
   *
   * Because we nest commentLists to arbitrary locations/depths,
   * finding the correct list becomes a little bit harder
   */
  // let list = Object.assign({}, state.comment.lists, {});
  let list = { ...state.comment.lists }
  for(let i = 0; i < listArgs.length; i++) {
    list = list[listArgs[i]];
    if(!list) {
      return false;
    }
  }
  return list;
}

const shouldFetchList = (state, listArgs) => {
  /**
   * Helper method to determine whether to fetch the list or not from arbitrary
   * listArgs
   *
   * NOTE: Uncomment console logs to help debugging
   */
  // console.log("shouldFetchList with these args ", listArgs, "?");
  const list = findListFromArgs(state, listArgs);
  // console.log("LIST in question: ", list);
  if(!list || !list.items) {
    // yes, the list we're looking for wasn't found
    // console.log("X shouldFetch - true: list not found");
    return true;
  } else if(list.isFetching) {
    // no, this list is already fetching
    // console.log("X shouldFetch - false: fetching");
    return false
  } else if(new Date().getTime() - list.lastUpdated > (1000 * 60 * 5)) {
    // yes, it's been longer than 5 minutes since the last fetch
    // console.log("X shouldFetch - true: older than 5 minutes");
    return true;
  } else {
    // maybe, depends on if the list was invalidated
    // console.log("X shouldFetch - " + list.didInvalidate + ": didInvalidate");
    return list.didInvalidate;
  }
}

export const fetchListIfNeeded = (...listArgs) => (dispatch, getState) => {
  if(listArgs.length === 0) {
    // If no arguments passed, make the list we want "all"
    listArgs = ["all"];
  }
  if(shouldFetchList(getState(), listArgs)) {
    return dispatch(fetchList(...listArgs));
  } else {
    return dispatch(returnCommentListPromise(...listArgs));
  }
}

export const returnCommentListPromise = (...listArgs) => (dispatch, getState) => {
  /**
   * This returns the list object from the reducer so that we can do things with it in
   * the component.
   *
   * For the "fetchIfNeeded()" functionality, we need to return a promised object
   * EVEN IF we don't need to fetch it. This is because if we have any .then()'s
   * in the components, they will fail when we don't need to fetch.
   */

  // return the array of objects just like the regular fetch
  const state = getState();
  const listItemIds = findListFromArgs(state, listArgs).items
  const listItems = listItemIds.map(id => state.comment.byId[id]);

  return new Promise((resolve) => {
    resolve({
      list: listItems
      , listArgs: listArgs
      , success: true
      , type: "RETURN_COMMENT_LIST_WITHOUT_FETCHING"
    })
  });
}

export const REQUEST_COMMENT_LIST = "REQUEST_COMMENT_LIST"
function requestCommentList(listArgs) {
  return {
    listArgs
    , type: REQUEST_COMMENT_LIST
  }
}

export const RECEIVE_COMMENT_LIST = "RECEIVE_COMMENT_LIST"
function receiveCommentList(json, listArgs) {
  return {
    error: json.message
    , list: json.comments
    , listArgs
    , receivedAt: Date.now()
    , success: json.success
    , type: RECEIVE_COMMENT_LIST
  }
}

export const ADD_COMMENT_TO_LIST = "ADD_COMMENT_TO_LIST";
export function addCommentToList(item, ...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  // allow user to either send the entire object or just the _id
  if(typeof(item) === 'string') {
    return {
      type: ADD_COMMENT_TO_LIST
      , id: item
      , listArgs
    }
  } else {
    return {
      type: ADD_COMMENT_TO_LIST
      , id: item._id
      , listArgs
    }
  }
}

export const REMOVE_COMMENT_FROM_LIST = "REMOVE_COMMENT_FROM_LIST"
export function removeCommentFromList(id, ...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ['all'];
  }
  return {
    type: REMOVE_COMMENT_FROM_LIST
    , id
    , listArgs
  }
}

export function fetchList(...listArgs) {
  return dispatch => {
    if(listArgs.length === 0) {
      // default to "all" list if we don't pass any listArgs
      listArgs = ["all"];
    }
    dispatch(requestCommentList(listArgs))
    /**
     * determine what api route we want to hit
     *
     * NOTE: use listArgs to determine what api call to make.
     * if listArgs[0] == null or "all", return list
     *
     * if listArgs has 1 arg, return "/api/comments/by-[ARG]"
     *
     * if 2 args, additional checks required.
     *  if 2nd arg is a string, return "/api/comments/by-[ARG1]/[ARG2]".
     *    ex: /api/comments/by-category/:category
     *  if 2nd arg is an array, though, return "/api/comments/by-[ARG1]-list" with additional query string
     *
     * TODO:  make this accept arbitrary number of args. Right now if more
     * than 2, it requires custom checks on server
     */
    let apiTarget = "/api/comments";
    if(listArgs.length == 1 && listArgs[0] !== "all") {
      apiTarget += `/by-${listArgs[0]}`;
    } else if(listArgs.length == 2 && Array.isArray(listArgs[1])) {
      // length == 2 has it's own check, specifically if the second param is an array
      // if so, then we need to call the "listByValues" api method instead of the regular "listByRef" call
      // this can be used for querying for a list of comments given an array of comment id's, among other things
      apiTarget += `/by-${listArgs[0]}-list?`;
      // build query string
      for(let i = 0; i < listArgs[1].length; i++) {
        apiTarget += `${listArgs[0]}=${listArgs[1][i]}&`
      }
    } else if(listArgs.length == 2) {
      // ex: ("author","12345")
      apiTarget += `/by-${listArgs[0]}/${listArgs[1]}`;
    } else if(listArgs.length > 2) {
      apiTarget += `/by-${listArgs[0]}/${listArgs[1]}`;
      for(let i = 2; i < listArgs.length; i++) {
        apiTarget += `/${listArgs[i]}`;
      }
    }
    return apiUtils.callAPI(apiTarget).then(
      json => dispatch(receiveCommentList(json, listArgs))
    )
  }
}

/**
 * LIST UTIL METHODS
 */
export const SET_COMMENT_FILTER = "SET_COMMENT_FILTER"
export function setFilter(filter, ...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  return {
    filter
    , listArgs
    , type: SET_COMMENT_FILTER
  }
}

export const SET_COMMENT_PAGINATION = "SET_COMMENT_PAGINATION"
export function setPagination(pagination, ...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  return {
    listArgs
    , pagination
    , type: SET_COMMENT_PAGINATION
  }
}

export const INVALIDATE_COMMENT_LIST = "INVALIDATE_COMMENT_LIST"
export function invalidateList(...listArgs) {
  if(listArgs.length === 0) {
    listArgs = ["all"];
  }
  return {
    listArgs
    , type: INVALIDATE_COMMENT_LIST
  }
}
