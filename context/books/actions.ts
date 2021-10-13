import { IBook, IBooksActions } from "../../interfaces/Books"

export const booksRequested = (): IBooksActions => {
  return {
    type: "GET_BOOKS_REQUEST",
    payload: { books: [] as Array<IBook>, error: "" },
  }
}

export const booksLoaded = (books: Array<IBook>): IBooksActions => {
  return {
    type: "GET_BOOKS_SUCCESS",
    payload: { books, error: "" },
  }
}

export const booksError = (error: string): IBooksActions => {
  return {
    type: "GET_BOOKS_FAILURE",
    payload: { books: [] as Array<IBook>, error },
  }
}
