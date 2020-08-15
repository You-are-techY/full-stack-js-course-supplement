/**
 * Combine all reducers
 */
import { combineReducers } from 'redux'
import taskReducer from './taskReducer'
import todoListReducer from './todoListReducer'

const rootReducer = combineReducers({
  taskReducer,
  todoListReducer,
  // ... other reducers will go here 
})

export default rootReducer