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
