import { iniatialCharacterState } from "./index"
import { ICharacterActions, ICharacterState } from "../../interfaces/Characters"

const reducer = (
  state: ICharacterState = iniatialCharacterState,
  action: ICharacterActions
): ICharacterState => {
  switch (action.type) {
    case "GET_CHARACTER_REQUEST":
      return {
        ...state,
        loading: true,
      }
    case "GET_CHARACTER_SUCCESS":
      return {
        ...state,
        character: action.payload.character,
        loading: false,
      }
    case "GET_CHARACTER_FAILURE":
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
