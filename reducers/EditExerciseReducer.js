import {CHANGE_EDIT_EXERCISE} from "../types";

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
  default:
    return state
  }
}