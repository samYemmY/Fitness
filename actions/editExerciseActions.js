import {CHANGE_EDIT_EXERCISE} from "../types";

export const changeEditExercise = (prop, value) => ({
  type: CHANGE_EDIT_EXERCISE,
  payload: {prop, value}
})