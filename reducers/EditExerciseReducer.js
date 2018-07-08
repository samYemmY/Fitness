import {
  CHANGE_EDIT_EXERCISE,
  ADD_EXERCISE_TO_STORE,
  DELETE_EXERCISE_FROM_STORE
} from "../types";

const initialState = {
  weight: 10,
  reps: 10,
  sets: 3,
  completed: false,
  selectedExercise: "Bizeps Curls",
  selectedRegion: null,
  store: {}
}

export default (state = initialState, action) => {
  switch(action.type)
  {
  case CHANGE_EDIT_EXERCISE:
    return {...state, [action.payload.prop]:action.payload.value}
  case ADD_EXERCISE_TO_STORE:
    return {...state, store: {...state.store, [action.payload.name] : action.payload.values}}
  case DELETE_EXERCISE_FROM_STORE:
    let newState = {...state}
    delete newState.store[action.payload]
    return newState
  default:
    return state
  }
}
