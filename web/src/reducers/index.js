import { combineReducers } from 'redux'
import todoReducer from './todoReducer'

const rootReducer = combineReducers({
  todoReducer,
  // ... other reducers will go here 
})

export default rootReducer