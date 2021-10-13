import { iniatialHousesState } from "./index"
import { IHousesActions, IHousesState } from "../../interfaces/Houses"

const reducer = (
  state: IHousesState = iniatialHousesState,
  action: IHousesActions
): IHousesState => {
  switch (action.type) {
    case "GET_HOUSES_REQUEST":
      return {
        ...state,
        loading: true,
      }
    case "GET_HOUSES_SUCCESS":
      return {
        ...state,
        houses: action.payload.houses,
        loading: false,
      }
    case "GET_HOUSES_FAILURE":
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
