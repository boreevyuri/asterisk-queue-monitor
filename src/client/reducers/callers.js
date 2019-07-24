import {UPDATE_CALLERS, CALLERS_TOGGLE_VIEW} from '../actions/callerActions'

const initialState = {
  callers: [],
  showAllCallers: false
}

export const callersReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CALLERS:
      return {...state, callers: action.payload}

    case CALLERS_TOGGLE_VIEW:
      return {...state, showAllCallers: !state.showAllCallers}

    default:
      return state
  }
}
