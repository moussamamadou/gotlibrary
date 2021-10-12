export interface IBook {
  name: string
  released: string
  publisher: string
  isbn: string
  numberOfPages: number
  povCharacters: Array<String>
}

export interface IBookState {
  book: IBook
  loading: boolean
  error: string
}

export interface IBookActions {
  type: "GET_BOOK_REQUEST" | "GET_BOOK_SUCCESS" | "GET_BOOK_FAILURE"
  payload: {
    book: IBook
    error: string
  }
}

export interface IBookContext {
  state: IBookState
  dispatch: React.Dispatch<IBookActions>
}
