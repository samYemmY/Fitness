import {
  SELECT_REGION,
  ADD_EXERCISE,
  CHANGE_EXERCISES,
  CLEAR_EXERCISE_PROGRESS,
  TOGGLE_EXERCISE_CLICK,
  RESET_CLICKED_EXERCISES,
  ADD_NEW_TIME,
  INCREMENT_TOTAL_WORKOUT_COUNT
} from "../types"

export const selectRegion = (name) => ({
  type:    SELECT_REGION,
  payload: name
})

export const addExercise = (region, exercise) => ({
  type:    ADD_EXERCISE,
  payload: {region, exercise}
})

export const changeExerciseProp = (prop, value) => {
  return(
    {
      type:    CHANGE_EXERCISES,
      payload: {prop, value}
    }
    )
}

export const clearExerciseProgress = () => ({
  type: CLEAR_EXERCISE_PROGRESS
})

export const toggleExerciseClick = (exercise, section) => ({
  type:    TOGGLE_EXERCISE_CLICK,
  payload: {exercise, section}
})

export const resetClickedExercises = () => ({
  type: RESET_CLICKED_EXERCISES
})

export const addNewTime = (time, selectedRegions) => ({
  type:    ADD_NEW_TIME,
  payload: {time, selectedRegions}
})

export const incrementTotalWorkoutCount = (selectedRegions) => ({
  type: INCREMENT_TOTAL_WORKOUT_COUNT,
  payload: selectedRegions
})