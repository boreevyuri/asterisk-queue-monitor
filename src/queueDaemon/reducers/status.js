import {UPDATE_STATUS} from '../actions/statusActions'

const initialState = {
  status: []
}

export const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATUS:
      return {...state, status: action.payload}

    default:
      return state
  }
}
