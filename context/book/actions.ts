import { IBook, IBookActions } from "../../interfaces/Books"

export const bookRequested = (): IBookActions => {
  return {
    type: "GET_BOOK_REQUEST",
    payload: { book: {} as IBook, error: "" },
  }
}

export const bookLoaded = (book: IBook): IBookActions => {
  return {
    type: "GET_BOOK_SUCCESS",
    payload: { book, error: "" },
  }
}

export const bookError = (error: string): IBookActions => {
  return {
    type: "GET_BOOK_FAILURE",
    payload: { book: {} as IBook, error },
  }
}
