import {SELECT_LANGUAGE} from "../types";
import dispatch from "react-redux"
import Lrc from "../components/Lrc"

export const selectLanguage = (lang) => ({
  type: SELECT_LANGUAGE,
  payload: lang
})