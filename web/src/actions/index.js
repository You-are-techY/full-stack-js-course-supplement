/**
 * Combine all actions into one export 
 */
import * as taskActions from './taskActions';
import * as todoListActions from './todoListActions';

export { taskActions };
export { todoListActions };

export default {
  taskActions
  , todoListActions
}