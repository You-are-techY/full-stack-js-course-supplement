import { combineReducers } from 'redux'
import taskReducer from './taskReducer'

const rootReducer = combineReducers({
  taskReducer,
  // ... other reducers will go here 
})

export default rootReducer