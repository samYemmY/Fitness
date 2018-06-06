import {SELECT_REGION, ADD_EXERCISE, CHANGE_EXERCISES, SET_STOPWATCH_TIME, CLEAR_EXERCISE_PROGRESS, TOGGLE_EXERCISE_CLICK, RESET_CLICKED_EXERCISES} from "../types"
import Lrc from "../components/Lrc"

const initialState = {
  stack: {
    "chest":    {data: {"Butterfly": {clicked: false}, "Schrägbank": {clicked: false}, "Bankdrücken": {clicked: false}}, progress: 0},
    "triceps":  {data: {"Seilzug": {clicked: false}, "Reverse Hantelcurls": {clicked: false}, "Dips": {clicked: false}}, progress: 0},
    "back":     {data: {"Langhantelrudern": {clicked: false}, "Rudern": {clicked: false}, "Latzug": {clicked: false}, "Kreuzheben": {clicked: false}, "Reverse Sit-Ups": {clicked: false}}, progress: 0},
    "biceps":   {data: {"S-Z-Stange": {clicked: false}, "Hammercurls": {clicked: false}, "Hantelcurls": {clicked: false}}, progress: 0},
    "shoulder": {data: {"Scheibenheben": {clicked: false}, "Nackenpresse": {clicked: false}, "Seitheben": {clicked: false}}, progress: 0},
    "belly":    {data: {"Seilzug": {clicked: false}, "Hantelcurls": {clicked: false}, "Dips": {clicked: false}}, progress: 0},
    "legs":     {data: {"Beinpresse": {clicked: false},"Beinbizeps": {clicked: false},"Beintrizeps": {clicked: false}}, progress: 0}
  },
  selectedRegions: [],
  modalPickerValue: "chest",
  modalTextInputValue: null,
  stopwatchTime: null
}

export default (state = initialState, action) => {
  switch(action.type)
  {
    case CHANGE_EXERCISES:
      return {...state, [action.payload.prop]: action.payload.value}

    case SELECT_REGION:
      return {...state, selectedRegions: action.payload}

    case ADD_EXERCISE:
      return {...state, stack: {...state.stack, [action.payload.region]: {data: [...state.stack[action.payload.region].data, action.payload.exercise]}}}

    case CLEAR_EXERCISE_PROGRESS:
      newState = {...state}
      for(let region in newState.stack)
      {
        newState.stack[region].progress = 0
      }
      return newState

    case RESET_CLICKED_EXERCISES:
      newState = {...state}
      for(let region in newState.stack)
      {
        for(let exercise in newState.stack[region].data){
          newState.stack[region].data[exercise].clicked = false
        }
      }
      return newState

    case TOGGLE_EXERCISE_CLICK:
      const {exercise, section} = action.payload
      const {regionKey} = section
      const clicked = state.stack[regionKey].data[exercise].clicked
      const exerciseAmount = Object.keys(state.stack[regionKey].data).length
      let progress = 1/exerciseAmount
      if(clicked)
      {
        progress = -progress
      }
      progress = state.stack[regionKey].progress + progress
      return {...state, stack: {...state.stack, [regionKey]:{...state.stack[regionKey], data: {...state.stack[regionKey].data, [exercise]: {clicked: !clicked}}, progress: progress}}}

    default:
      return state
  }
}