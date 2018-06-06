import {SELECT_LANGUAGE} from "../types"
import Lrc from "../components/Lrc"

const initialState = {
  lrc: Lrc.ger
}

export default (state = initialState, action) => {
  switch(action.type)
  {
    case SELECT_LANGUAGE:
      return {...state, lrc: action.payload}

    default:
      return state
  }
}