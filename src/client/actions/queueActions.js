// import { forIn, concat, values} from 'lodash'
import forIn from 'lodash/forIn'
import concat from 'lodash/concat'
import values from 'lodash/values'
import {updateCallers} from './callerActions'
import {updateOperators} from './operatorActions'

const UPDATE_QUEUE = 'UPDATE_QUEUE'

export const updateQueue = async (url, dispatch) => {
  let callers = []
  let operators = []

  const response = await fetch(url)
  const {content} = await response.json()
  forIn(content, (queue) => {
    callers = concat(callers, values(queue.callerList))
    operators = concat(operators, values(queue.memberList))
  })

  return {
    type: UPDATE_QUEUE,
    updateCallers: dispatch(updateCallers(callers)),
    updateOperators: dispatch(updateOperators(operators))
  }
}
