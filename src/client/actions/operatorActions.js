export const ADD_OPERATOR = 'ADD_OPERATOR'
export const UPDATE_OPERATORS = 'UPDATE_OPERATORS'

export const updateOperators = (operators) => {
  return {
    type: UPDATE_OPERATORS,
    payload: operators
  }
}
