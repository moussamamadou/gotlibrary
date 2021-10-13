import { createContext } from "react"
import { IHousesState, IHousesContext } from "../../interfaces/Houses"

export const iniatialHousesState = {} as IHousesState

const HousesContext = createContext({} as IHousesContext)

export default HousesContext
