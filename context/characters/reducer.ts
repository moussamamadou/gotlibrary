import { iniatialCharactersState } from "./index"
import {
  ICharactersActions,
  ICharactersState,
} from "../../interfaces/Characters"

const reducer = (
  state: ICharactersState = iniatialCharactersState,
  action: ICharactersActions
): ICharactersState => {
  switch (action.type) {
    case "GET_CHARACTERS_REQUEST":
      return {
        ...state,
        loading: true,
      }
    case "GET_CHARACTERS_SUCCESS":
      return {
        ...state,
        characters: action.payload.characters,
        pagination: action.payload.pagination,
        loading: false,
      }
    case "GET_CHARACTERS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}

export default reducer
