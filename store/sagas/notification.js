import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo, invokeCallback } from '~/store/actions/common'

import {
    replaceNotification,
} from '~/store/actions/notification'


const requestGetNotificationAsync = createRequestSaga({
    request: api.notification.getNotification,
    key: 'getNotification',    
    success: [
        (data, {args:[accessToken, start, take]}) => replaceNotification({data, start, take}),    
        (data, {args}) => invokeCallback(args[args.length-1], data),         
    ],
    failure: [
        () => setToast('Couldn\'t get notification', 'error')
    ],
})



// root saga reducer
export default [
    // like case return, this is take => call
    // inner function we use yield*
    // from direct watcher we just yield value
    function* asyncNotificationFetchWatcher() {
        // use takeLatest instead of take every, so double click in short time will not trigger more fork
        yield [
            takeLatest('app/getNotification', requestGetNotificationAsync),            
        ]
    },
]


