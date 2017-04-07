import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { requests, toast, drawer, router } from './common'
import { authReducer as auth } from './auth'
import { accountReducer as account } from './account'
import { dataReducer as data } from './data'

// a rootReducer is like a single state, key is function return a sub state value
const rootReducer = combineReducers({    
  form,
  ui: combineReducers({
    // ui reducer should be placed here    
    toast,
    drawer,
  }),  
  requests, 
  router,
  auth,
  account,
  data,
})

export default rootReducer

