import { createContext } from "react"
import { IBooksState, IBooksContext, IBook } from "../../interfaces/Books"
import { IPagination } from "../../interfaces/Pagination"

export const iniatialBooksState = {
  books: [] as Array<IBook>,
  loading: true,
  error: "",
  pagination: {} as IPagination,
} as IBooksState

const BooksContext = createContext({} as IBooksContext)

export default BooksContext
