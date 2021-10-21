import { useReducer } from "react"
import HousesContext, { iniatialHousesState } from "./index"

import reducer from "./reducer"

export function HousesContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [housesState, housesDispatch] = useReducer(reducer, iniatialHousesState)

  const housesContextValues = {
    state: housesState,
    dispatch: housesDispatch,
  }

  return (
    <HousesContext.Provider value={housesContextValues}>
      {children}
    </HousesContext.Provider>
  )
}
