import { IHouse, IHouseActions } from "../../interfaces/Houses"

export const housesRequested = (): IHouseActions => {
  return {
    type: "GET_HOUSE_REQUEST",
    payload: { house: {} as IHouse, error: "" },
  }
}

export const housesLoaded = (house: IHouse): IHouseActions => {
  return {
    type: "GET_HOUSE_SUCCESS",
    payload: { house, error: "" },
  }
}

export const housesError = (error: string): IHouseActions => {
  return {
    type: "GET_HOUSE_FAILURE",
    payload: { house: {} as IHouse, error },
  }
}
