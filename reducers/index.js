import {combineReducers} from "redux"
import ExercisesReducer from "./ExercisesReducer"
import EditExerciseReducer from "./EditExerciseReducer"
import LanguageReducer from "./LanguageReducer"

export default combineReducers({
  exercises: ExercisesReducer,
  editExercise: EditExerciseReducer,
  language: LanguageReducer
})