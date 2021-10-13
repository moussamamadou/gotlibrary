import { IHouse, IHousesActions } from "../../interfaces/Houses"
import { IPagination } from "../../interfaces/Pagination"

export const housesRequested = (): IHousesActions => {
  return {
    type: "GET_HOUSES_REQUEST",
    payload: {
      houses: [] as Array<IHouse>,
      error: "",
      pagination: {} as IPagination,
    },
  }
}

export const housesLoaded = (
  houses: Array<IHouse>,
  pagination: IPagination
): IHousesActions => {
  return {
    type: "GET_HOUSES_SUCCESS",
    payload: { houses, error: "", pagination: pagination },
  }
}

export const housesError = (error: string): IHousesActions => {
  return {
    type: "GET_HOUSES_FAILURE",
    payload: {
      houses: [] as Array<IHouse>,
      error,
      pagination: {} as IPagination,
    },
  }
}
