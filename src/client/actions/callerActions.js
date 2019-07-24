// import * as _ from 'lodash'
// export const ADD_CALLERS = 'ADD_CALLERS'
export const CALLERS_TOGGLE_VIEW = 'CALLERS_TOGGLE_VIEW'
export const UPDATE_CALLERS = 'UPDATE_CALLERS'

export const toggleCallers = () => ({
  type: CALLERS_TOGGLE_VIEW
})

export const updateCallers = (callers) => {
  return {
    type: UPDATE_CALLERS,
    payload: callers
  }
}


// export const getCallers = async (url) => {
//
//   let callers = []
//   const response = await fetch(url)
//   const {content} = await response.json()
//   _.forIn(content, (queue) => {
//     callers = _.concat(callers, _.values(queue.callerList))
//   })
//
//   return {
//     type: ADD_CALLERS,
//     payload: callers
//   }
// }
