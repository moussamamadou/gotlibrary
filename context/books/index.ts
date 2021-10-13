import { createContext } from "react"
import { IBooksState, IBooksContext } from "../../interfaces/Books"

export const iniatialBooksState = {} as IBooksState

const BooksContext = createContext({} as IBooksContext)

export default BooksContext
