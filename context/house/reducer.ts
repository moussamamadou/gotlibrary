import { iniatialHouseState } from "./index"
import { IHouseActions, IHouseState } from "../../interfaces/Houses"

const reducer = (
  state: IHouseState = iniatialHouseState,
  action: IHouseActions
): IHouseState => {
  switch (action.type) {
    case "GET_HOUSE_REQUEST":
      return {
        ...state,
        loading: true,
      }
    case "GET_HOUSE_SUCCESS":
      return {
        ...state,
        house: action.payload.house,
        loading: false,
      }
    case "GET_HOUSE_FAILURE":
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
