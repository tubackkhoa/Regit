import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'

import {
    replaceProfile,
} from '~/store/actions/account'


const requestGetProfileAsync = createRequestSaga({
    request: api.account.getProfile,
    key: 'getProfile',    
    success: [
        (data) => replaceProfile(data),       
    ],
    failure: [
        () => setToast('Couldn\'t get profile', 'error')
    ],
})


// root saga reducer
const asyncAccountWatchers = [
    // like case return, this is take => call
    // inner function we use yield*
    // from direct watcher we just yield value
    function* asyncAccountFetchWatcher() {
        // use takeLatest instead of take every, so double click in short time will not trigger more fork
        yield [
            takeLatest('app/getProfile', requestGetProfileAsync),            
        ]
    },
]

export default asyncAccountWatchers

