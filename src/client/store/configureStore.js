import {createStore, applyMiddleware} from 'redux'
import {rootReducer} from '../reducers'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise';

export const store = createStore(
  rootReducer,
  applyMiddleware(promiseMiddleware, thunk, logger)
)
