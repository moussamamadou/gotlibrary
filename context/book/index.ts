import { createContext } from "react"
import { IBookState, IBookContext } from "../../interfaces/Books"

export const iniatialBookState = {} as IBookState

const BookContext = createContext({} as IBookContext)

export default BookContext
