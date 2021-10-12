import { useReducer } from "react"
import CharacterContext, { iniatialCharacterState } from "./index"

import reducer from "./reducer"

export function CharacterContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [charactersState, charactersDispatch] = useReducer(
    reducer,
    iniatialCharacterState
  )

  const charactersContextValues = {
    state: charactersState,
    dispatch: charactersDispatch,
  }

  return (
    <CharacterContext.Provider value={charactersContextValues}>
      {children}
    </CharacterContext.Provider>
  )
}
