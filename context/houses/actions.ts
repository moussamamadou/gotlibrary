import { IHouse, IHousesActions } from "../../interfaces/Houses"

export const housesRequested = (): IHousesActions => {
  return {
    type: "GET_HOUSES_REQUEST",
    payload: { houses: [] as Array<IHouse>, error: "" },
  }
}

export const housesLoaded = (houses: Array<IHouse>): IHousesActions => {
  return {
    type: "GET_HOUSES_SUCCESS",
    payload: { houses, error: "" },
  }
}

export const housesError = (error: string): IHousesActions => {
  return {
    type: "GET_HOUSES_FAILURE",
    payload: { houses: [] as Array<IHouse>, error },
  }
}
