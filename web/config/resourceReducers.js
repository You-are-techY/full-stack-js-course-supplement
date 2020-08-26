/**
 * Reads and exports the reducers as defined by each resource module
 *
 * NOTE: this facilitates adding reducers via the CLI
 */

export { default as user } from '../resources/user/userReducers.js';


export { default as task } from '../resources/task/taskReducers.js';
export { default as todoList } from '../resources/todoList/todoListReducers.js';
export { default as comment } from '../resources/comment/commentReducers.js';