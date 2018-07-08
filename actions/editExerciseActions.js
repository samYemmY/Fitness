import {
  CHANGE_EDIT_EXERCISE,
  ADD_EXERCISE_TO_STORE,
  DELETE_EXERCISE_FROM_STORE
} from "../types";

export const changeEditExercise = (prop, value) => ({
  type: CHANGE_EDIT_EXERCISE,
  payload: {prop, value}
})

export const addExerciseToStore = (name, values) => ({
  type: ADD_EXERCISE_TO_STORE,
  payload: {name, values}
})

export const deleteExerciseFromStore = (name) => ({
  type: DELETE_EXERCISE_FROM_STORE,
  payload: name
})
