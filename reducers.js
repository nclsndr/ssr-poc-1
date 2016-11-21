import { combineReducers } from 'redux'

const defaultState = {
  counter: 1
}

export default function appCounter(state = defaultState, action) {
  switch (action.type) {
    default:
      return state
  }
}
