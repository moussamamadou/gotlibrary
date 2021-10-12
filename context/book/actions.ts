import { IBook, IBookActions } from "../../interfaces/Books"

export const booksRequested = (): IBookActions => {
  return {
    type: "GET_BOOK_REQUEST",
    payload: { book: {} as IBook, error: "" },
  }
}

export const booksLoaded = (book: IBook): IBookActions => {
  return {
    type: "GET_BOOK_SUCCESS",
    payload: { book, error: "" },
  }
}

export const booksError = (error: string): IBookActions => {
  return {
    type: "GET_BOOK_FAILURE",
    payload: { book: {} as IBook, error },
  }
}
