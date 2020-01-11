import {combineReducers} from 'redux'
import {statusReducer} from './status'

export const rootReducer = combineReducers({
  status: statusReducer
})
