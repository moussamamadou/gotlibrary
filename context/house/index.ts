import { createContext } from "react"
import { IHouseState, IHouseContext } from "../../interfaces/Houses"

export const iniatialHouseState = {} as IHouseState

const HouseContext = createContext({} as IHouseContext)

export default HouseContext
