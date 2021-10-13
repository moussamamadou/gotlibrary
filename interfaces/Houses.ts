export interface IHouse {
  url: string
  name: string
  coatOfArms: string
  titles: Array<string>
  region: string
  currentLord: string
  founder: string
  heir: string
  overlord: string
  cadetBranches: Array<string>
  swornMembers: Array<string>
}

export interface IHouseState {
  house: IHouse
  loading: boolean
  error: string
}
export interface IHousesState {
  houses: Array<IHouse>
  loading: boolean
  error: string
}

export interface IHouseActions {
  type: "GET_HOUSE_REQUEST" | "GET_HOUSE_SUCCESS" | "GET_HOUSE_FAILURE"
  payload: {
    house: IHouse
    error: string
  }
}
export interface IHousesActions {
  type: "GET_HOUSES_REQUEST" | "GET_HOUSES_SUCCESS" | "GET_HOUSES_FAILURE"
  payload: {
    houses: Array<IHouse>
    error: string
  }
}

export interface IHouseContext {
  state: IHouseState
  dispatch: React.Dispatch<IHouseActions>
}

export interface IHousesContext {
  state: IHousesState
  dispatch: React.Dispatch<IHousesActions>
}
