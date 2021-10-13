import { useReducer } from "react"
import CharactersContext, { iniatialCharactersState } from "./index"

import reducer from "./reducer"

export function CharactersContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [charactersState, charactersDispatch] = useReducer(
    reducer,
    iniatialCharactersState
  )

  const charactersContextValues = {
    state: charactersState,
    dispatch: charactersDispatch,
  }

  return (
    <CharactersContext.Provider value={charactersContextValues}>
      {children}
    </CharactersContext.Provider>
  )
}
