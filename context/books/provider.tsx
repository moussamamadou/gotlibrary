import { useReducer } from "react"
import BooksContext, { iniatialBooksState } from "./index"

import reducer from "./reducer"

export function BooksContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [booksState, booksDispatch] = useReducer(reducer, iniatialBooksState)

  const booksContextValues = {
    state: booksState,
    dispatch: booksDispatch,
  }

  return (
    <BooksContext.Provider value={booksContextValues}>
      {children}
    </BooksContext.Provider>
  )
}
