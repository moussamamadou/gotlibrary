import { useReducer } from "react"
import HouseContext, { iniatialHouseState } from "./index"

import reducer from "./reducer"

export function HouseContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [housesState, housesDispatch] = useReducer(reducer, iniatialHouseState)

  const housesContextValues = {
    state: housesState,
    dispatch: housesDispatch,
  }

  return (
    <HouseContext.Provider value={housesContextValues}>
      {children}
    </HouseContext.Provider>
  )
}
