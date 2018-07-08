import {SELECT_LANGUAGE} from "../types"
import Lrc from "../components/Lrc"

const initialState = {
  lrc: Lrc.de
}

export default (state = initialState, action) => {
  switch(action.type)
  {
    case SELECT_LANGUAGE:
      return {...state, lrc: Lrc[action.payload]}

    default:
      return state
  }
}
