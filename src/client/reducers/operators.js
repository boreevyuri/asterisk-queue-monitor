import {ADD_OPERATOR, UPDATE_OPERATORS} from '../actions/operatorActions'
// import {castArray, forEach, findIndex} from 'lodash'
import castArray from 'lodash/castArray'
import forEach from 'lodash/forEach'
import findIndex from 'lodash/findIndex'
import config from '../config'

const initialState = {
  operators: []
}

const compactOperators = (array, previousOps) => {
  const result = []

  const convertedOperators = array.map(el => {
    el.queue = castArray({
      queue: el.queue,
      active: !!(+el.inCall)
    })
    el.lastCall = !!(+el.lastCall) && new Date(el.lastCall * 1000).toLocaleTimeString()
    el.status = +el.paused ? `paused`
      : +el.status === 2 ? `busy`
      : `free`
    if (previousOps.length === 0) {
      el.duration = 0
    } else {
      let index = findIndex(previousOps, oldEl => oldEl.name === el.name)
      if (index !== -1) {
        el.duration = (el.status === previousOps[index].status) && (el.status === `busy` || el.status === `paused`) ?
          previousOps[index].duration + config.updateInterval/1000
          : 0
      }

    }
    return el
  })

  forEach(convertedOperators, operatorItem => {
    let index = findIndex(result, el => el.name === operatorItem.name)
    if (index === -1) {
      result.push(operatorItem)
    } else {
      result[index].queue = [...result[index].queue, operatorItem.queue[0]]
    }
  })

  return result
}

export const operatorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_OPERATOR:
      return {...state, operators: action.payload}
    case UPDATE_OPERATORS:
      return {...state, operators: compactOperators(action.payload, state.operators)}
    default:
      return state
  }
}
