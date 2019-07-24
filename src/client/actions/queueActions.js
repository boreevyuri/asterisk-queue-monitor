import * as _ from 'lodash'
import {updateCallers} from './callerActions'
import {updateOperators} from './operatorActions'

const UPDATE_QUEUE = 'UPDATE_QUEUE'

export const updateQueue = async (url, dispatch) => {
  let callers = []
  let operators = []

  const response = await fetch(url)
  const {content} = await response.json()
  _.forIn(content, (queue) => {
    callers = _.concat(callers, _.values(queue.callerList))
    operators = _.concat(operators, _.values(queue.memberList))
  })

  return {
    type: UPDATE_QUEUE,
    updateCallers: dispatch(updateCallers(callers)),
    updateOperators: dispatch(updateOperators(operators))
  }
}
