import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo, invokeCallback } from '~/store/actions/common'

import {
    replaceCountries,
    replaceCities
} from '~/store/actions/data'


const requestGetCountriesAsync = createRequestSaga({
    request: api.data.getCountries,
    key: 'getCountries',    
    success: [
        (data) => replaceCountries(data),   
        (data, {args}) => invokeCallback(args[args.length-1], data),      
    ],
    failure: [
        () => setToast('Couldn\'t get countries', 'error')
    ],
})

const requestGetCitiesAsync = createRequestSaga({
    request: api.data.getCities,
    key: 'getCities',    
    success: [
        (data) => replaceCities(data),             
    ],
    failure: [
        () => setToast('Couldn\'t get cities', 'error')
    ],
})


// saga reducer
export default [
    // like case return, this is take => call
    // inner function we use yield*
    // from direct watcher we just yield value
    function* asyncDataFetchWatcher() {
        // use takeLatest instead of take every, so double click in short time will not trigger more fork
        yield [
            takeLatest('app/getCountries', requestGetCountriesAsync),            
            takeLatest('app/getCities', requestGetCitiesAsync),            
        ]
    },
]

