import { createContext } from "react"
import { IHousesState, IHousesContext, IHouse } from "../../interfaces/Houses"
import { IPagination } from "../../interfaces/Pagination"

export const iniatialHousesState = {
  houses: [] as Array<IHouse>,
  loading: true,
  error: "",
  pagination: {} as IPagination,
} as IHousesState

const HousesContext = createContext({} as IHousesContext)

export default HousesContext
