import {
  SELECT_REGION,
  ADD_EXERCISE_TO_STACK,
  DELETE_EXERCISE_FROM_STACK,
  CHANGE_EXERCISES,
  SET_STOPWATCH_TIME,
  CLEAR_EXERCISE_PROGRESS,
  TOGGLE_EXERCISE_CLICK,
  RESET_CLICKED_EXERCISES,
  ADD_NEW_TIME,
  INCREMENT_TOTAL_WORKOUT_COUNT
} from "../types"
import {Time} from "../utils"
import * as _ from "lodash"

const regionProps = {
  progress:    0,
  totalWorkouts:  0,
  averageTime: "00:00:00",
  lastTime:    "00:00:00",
  timeStore:   []
}

const initialState = {
  stack: {
    "chest":   {
      data:       {
        "Butterfly":   {clicked: false},
        "Schrägbank":  {clicked: false},
        "Bankdrücken": {clicked: false}
      },
      ...regionProps
    },
    "triceps": {
      data:       {
        "Seilzug":             {clicked: false},
        "Reverse Hantelcurls": {clicked: false},
        "Dips":                {clicked: false}
      },
      ...regionProps
    },
    "back":     {
      data:        {
        "Langhantelrudern": {clicked: false},
        "Rudern":           {clicked: false},
        "Latzug":           {clicked: false},
        "Kreuzheben":       {clicked: false},
        "Reverse Sit-Ups":  {clicked: false}
      },
      ...regionProps
    },
    "biceps":   {
      data:        {
        "S-Z-Stange":  {clicked: false},
        "Hammercurls": {clicked: false},
        "Hantelcurls": {clicked: false}
      },
      ...regionProps
    },
    "shoulder": {
      data:        {
        "Scheibenheben": {clicked: false},
        "Nackenpresse":  {clicked: false},
        "Seitheben":     {clicked: false}
      },
      ...regionProps
    },
    "belly":    {
      data:       {
        "Seilzug":     {clicked: false},
        "Hantelcurls": {clicked: false},
        "Dips":        {clicked: false}
      },
      ...regionProps
    },
    "legs":     {
      data:        {
        "Beinpresse":  {clicked: false},
        "Beinbizeps":  {clicked: false},
        "Beintrizeps": {clicked: false}
      },
      ...regionProps
    }
  },
  selectedRegions:     ["chest","triceps"],
  modalVisible:        false,
  stopwatchTime:       "00:00:00"
}

export default (state = initialState, action) =>{
  switch (action.type)
  {
  case CHANGE_EXERCISES:
    return {...state, [action.payload.prop]: action.payload.value}

  case SELECT_REGION:
    return {...state, selectedRegions: action.payload}

  case ADD_EXERCISE_TO_STACK:
    return {
      ...state,
      stack: {
        ...state.stack,
        [action.payload.region]: {...state.stack[action.payload.region], data: {...state.stack[action.payload.region].data, [action.payload.exercise]: {clicked: false}}}
      }
    }

  case DELETE_EXERCISE_FROM_STACK:
    let newState = {...state}
    delete newState.stack[action.payload.region].data[action.payload.name]
    return newState

  case CLEAR_EXERCISE_PROGRESS:
    newState = {...state}
    for (let region in newState.stack)
    {
      newState.stack[region].progress = 0
    }
    return newState

  case RESET_CLICKED_EXERCISES:
    newState = {...state}
    for (let region in newState.stack)
    {
      for (let exercise in newState.stack[region].data)
      {
        newState.stack[region].data[exercise].clicked = false
      }
    }
    return newState

  case TOGGLE_EXERCISE_CLICK:
    const {exercise, section} = action.payload
    const {regionKey}         = section
    const clicked             = state.stack[regionKey].data[exercise].clicked
    const exerciseAmount      = Object.keys(state.stack[regionKey].data).length
    let progress              = 1 / exerciseAmount
    if (clicked)
    {
      progress = -progress
    }
    progress = state.stack[regionKey].progress + progress
    return {
      ...state,
      stack: {
        ...state.stack,
        [regionKey]: {
          ...state.stack[regionKey],
          data:     {...state.stack[regionKey].data, [exercise]: {clicked: !clicked}},
          progress: progress
        }
      }
    }

  case ADD_NEW_TIME:
    const {time, selectedRegions} = action.payload
    return {
      ...state,
      stack: {...state.stack, [
        selectedRegions[0]]: {
        ...state.stack[selectedRegions[0]],
          lastTime: time,
          timeStore: [...state.stack[selectedRegions[0]].timeStore, Time.timestampToSeconds(time)],
          averageTime: Time.secondsToTimestamp(Time.getAverageTimeInSeconds([...state.stack[selectedRegions[0]].timeStore, Time.timestampToSeconds(time)]))}}
    }

  case INCREMENT_TOTAL_WORKOUT_COUNT:
    return {...state, stack: {...state.stack, [action.payload[0]]: {...state.stack[action.payload[0]], totalWorkouts: ++state.stack[action.payload[0]].totalWorkouts}, [action.payload[1]]: {...state.stack[action.payload[1]], totalWorkouts: ++state.stack[action.payload[1]].totalWorkouts}}}

  default:
    return state
  }
}
