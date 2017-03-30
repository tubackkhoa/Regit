import { fork } from 'redux-saga/effects'
import asyncAuthWatchers from './auth'

// saga must be a function like generator of other functions
const rootSaga = function* () {
  yield [       
    ...asyncAuthWatchers.map(watcher => fork(watcher)),
  ]
}

export default rootSaga