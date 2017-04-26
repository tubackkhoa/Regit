import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { requests, toast, drawer, router, search } from './common'
import { authReducer as auth } from './auth'
import { accountReducer as account } from './account'
import { dataReducer as data } from './data'
import { notificationReducer as notification } from './notification'

// a rootReducer is like a single state, key is function return a sub state value
const rootReducer = combineReducers({    
  form,
  ui: combineReducers({
    // ui reducer should be placed here    
    toast,
    drawer,
    search,
  }),  
  requests, 
  router,
  auth,
  account,
  data,
  notification,
})

export default rootReducer

