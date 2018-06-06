import {CHANGE_EDIT_EXERCISE} from "../types";

const initialState = {
  notes: "",
  weight: "",
  reps: "",
  sets: "",
  completed: false,
  selectedExercise: null,
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