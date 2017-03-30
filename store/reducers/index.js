import { combineReducers } from 'redux'
import { requests, toast, drawer } from './common'
import { authReducer as auth } from './auth'

// a rootReducer is like a single state, key is function return a sub state value
const rootReducer = combineReducers({    
  ui: combineReducers({
    // ui reducer should be placed here    
    toast,
    drawer,
  }),  
  requests, 
  auth,
})

export default rootReducer

