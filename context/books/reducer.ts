import { iniatialBooksState } from "./index"
import { IBooksActions, IBooksState } from "../../interfaces/Books"

const reducer = (
  state: IBooksState = iniatialBooksState,
  action: IBooksActions
): IBooksState => {
  switch (action.type) {
    case "GET_BOOKS_REQUEST":
      return {
        ...state,
        loading: true,
      }
    case "GET_BOOKS_SUCCESS":
      return {
        ...state,
        books: action.payload.books,
        loading: false,
      }
    case "GET_BOOKS_FAILURE":
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
