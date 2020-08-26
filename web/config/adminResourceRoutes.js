/**
 * Reads and exports the routes as defined by each resource module.
 *
 * NOTE: this facilitates adding routes via the CLI. The CLI will automatically
 * build these exports with the camelCase version of the resource name so as to
 * add a consistent top-level path to the resource. A resource named UserWorkout
 * will show below as follows:
 *
 * export { default as userWorkout } from './userWorkout/UserWorkoutRouter.js.jsx'
 *
 * This will give it a top-level route path called 'user-workouts'
 */

// export { default as admin } from  './AdminRouter.js.jsx';
export { default as users } from '../resources/user/admin/UserAdminRouter.js.jsx';


export { default as tasks } from '../resources/task/admin/TaskAdminRouter.js.jsx';
export { default as todoLists } from '../resources/todoList/admin/TodoListAdminRouter.js.jsx';
export { default as comments } from '../resources/comment/admin/CommentAdminRouter.js.jsx';