import { IHouse, IHouseActions } from "../../interfaces/Houses"

export const houseRequested = (): IHouseActions => {
  return {
    type: "GET_HOUSE_REQUEST",
    payload: { house: {} as IHouse, error: "" },
  }
}

export const houseLoaded = (house: IHouse): IHouseActions => {
  return {
    type: "GET_HOUSE_SUCCESS",
    payload: { house, error: "" },
  }
}

export const houseError = (error: string): IHouseActions => {
  return {
    type: "GET_HOUSE_FAILURE",
    payload: { house: {} as IHouse, error },
  }
}
