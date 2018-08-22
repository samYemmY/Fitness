import {SELECT_LANGUAGE} from "../types"
import Lrc from "../components/Lrc"

const initialState = {
  lrc: Lrc.de,
  selectedLanguage: "de",
  languages: {
    "de": "German",
    "en": "English"
  }
}

export default (state = initialState, action) => {
  switch(action.type)
  {
    case SELECT_LANGUAGE:
      return {...state, lrc: Lrc[action.payload], selectedLanguage: action.payload};

    default:
      return state
  }
}
