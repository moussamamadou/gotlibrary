import { iniatialBookState } from "./index"
import { IBookActions, IBookState } from "../../interfaces/Books"

const reducer = (
  state: IBookState = iniatialBookState,
  action: IBookActions
): IBookState => {
  switch (action.type) {
    case "GET_BOOK_REQUEST":
      return {
        ...state,
        loading: true,
      }
    case "GET_BOOK_SUCCESS":
      return {
        ...state,
        book: action.payload.book,
        loading: false,
      }
    case "GET_BOOK_FAILURE":
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
