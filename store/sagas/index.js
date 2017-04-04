import { fork } from 'redux-saga/effects'
import asyncAuthWatchers from './auth'
import asyncAccountWatchers from './account'

// saga must be a function like generator of other functions
const rootSaga = function* () {
  yield [       
    ...asyncAuthWatchers.map(watcher => fork(watcher)),
    ...asyncAccountWatchers.map(watcher => fork(watcher)),
  ]
}

export default rootSaga