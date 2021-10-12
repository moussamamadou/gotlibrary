import { useReducer } from "react"
import BookContext, { iniatialBookState } from "./index"

import reducer from "./reducer"

export function BookContextProvider({ children }: React.PropsWithChildren<{}>) {
  const [booksState, booksDispatch] = useReducer(reducer, iniatialBookState)

  const booksContextValues = {
    state: booksState,
    dispatch: booksDispatch,
  }

  return (
    <BookContext.Provider value={booksContextValues}>
      {children}
    </BookContext.Provider>
  )
}
