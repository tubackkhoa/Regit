import {
  MARK_REQUEST_PENDING,
  MARK_REQUEST_SUCCESS, 
  MARK_REQUEST_FAILED,
  MARK_REQUEST_CANCELLED
} from '~/store/constants/actions'
// we defined reducer to change state to state with action

// these reducer is used for many pages
export const requests = (state = {}, { type, payload, meta }) => {
  switch (type) {
    case MARK_REQUEST_PENDING:    
      return { ...state, [meta.key]: { status: 'pending', error: null } }
    case MARK_REQUEST_SUCCESS:
      return { ...state, [meta.key]: { status: 'success', error: null } } 
    case MARK_REQUEST_FAILED:
      return { ...state, [meta.key]: { status: 'failure', error: payload } }
    case MARK_REQUEST_CANCELLED:
      return { ...state, [meta.key]: { status: 'success', error: null } }
    default:
      return state
  }
}

// show toast, can use material ui snackbar
export const toast = (state = null, { type, payload }) => {
  switch (type) {
    case 'app/setToast':
      return payload
    case 'app/clearToast':
      return null
    default:
      return state
  }
}

export const drawer = (state = {drawerState: 'closed'}, { type }) => {
  switch (type) {
    case 'app/openDrawer':
      return {
        ...state,
        drawerState: 'opened',
      }
    case 'app/closeDrawer':
      return {
        ...state,
        drawerState: 'closed',
      }
    default:
      return state
  }
}

// should always be payload for faster copy and paste
// we write our own route, only replace, do not use speacial function like jumpTo, it can be replaced by modal
export const router = (state = {stack:[]}, { type, payload }) => {
  switch(type) {
    case 'navigate/push':      
      return state.route === payload ? state : {route:payload, stack: state.route ? [state.route, ...state.stack] : [...state.stack]}
    case 'navigate/reset':
      return {route:payload, stack:[]}
    case 'navigate/pop':      
      return state.stack[0] ? {route:state.stack[0], stack:state.stack.slice(1)} : state
    default:
      return state
  }  
}