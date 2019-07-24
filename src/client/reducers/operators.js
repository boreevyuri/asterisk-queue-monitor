import {ADD_OPERATOR, UPDATE_OPERATORS} from '../actions/operatorActions'
import * as _ from 'lodash'

const initialState = {
  operators: []
}

const compactOperators = (array) => {
  const resultArray = []

  const newArray = array.map(el => {
    el.queue = _.castArray({
      queue: el.queue,
      active: el.inCall
    })
    return el
  })
  _.forEach(newArray, function (value) {
    let index = _.findIndex(resultArray, el => el.name === value.name)
    if (index === -1) {
      resultArray.push(value)
    } else {
      resultArray[index].queue = [...resultArray[index].queue, value.queue[0]]
    }
  })
  return resultArray
}

export const operatorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_OPERATOR:
      return {...state, operators: action.payload}
    case UPDATE_OPERATORS:
      return {...state, operators: compactOperators(action.payload)}
    default:
      return state
  }
}
