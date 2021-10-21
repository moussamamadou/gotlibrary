import { IBook, IBooksActions } from "../../interfaces/Books"
import { IPagination } from "../../interfaces/Pagination"

export const booksRequested = (): IBooksActions => {
  return {
    type: "GET_BOOKS_REQUEST",
    payload: {
      books: [] as Array<IBook>,
      error: "",
      pagination: {} as IPagination,
    },
  }
}

export const booksLoaded = (
  books: Array<IBook>,
  pagination: IPagination
): IBooksActions => {
  return {
    type: "GET_BOOKS_SUCCESS",
    payload: { books, error: "", pagination },
  }
}

export const booksError = (error: string): IBooksActions => {
  return {
    type: "GET_BOOKS_FAILURE",
    payload: {
      books: [] as Array<IBook>,
      error,
      pagination: {} as IPagination,
    },
  }
}
