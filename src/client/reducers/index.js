import {combineReducers} from 'redux'
import {callersReducer} from './callers'
import {operatorsReducer} from './operators'

export const rootReducer = combineReducers({
  callerList: callersReducer,
  operatorList: operatorsReducer
})
