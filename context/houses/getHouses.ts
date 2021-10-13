import axios from "axios"
import _ from "lodash"
import { IHouse, IHousesContext } from "../../interfaces/Houses"

const getHouses = (
  page: number,
  pageSize: number,
  housesContext: IHousesContext
) => {
  housesContext.dispatch({
    type: "GET_HOUSES_REQUEST",
    payload: { houses: [] as Array<IHouse>, error: "" },
  })

  axios
    .get(
      `${process.env.NEXT_PUBLIC_API}/houses?page=${page}&pageSize=${pageSize}`
    )
    .then((res: any) => {
      let tempHouses: Array<IHouse> = []
      res.data.map((house: any) => {
        tempHouses.push({
          url: house.url,
          name: house.name,
          coatOfArms: house.coatOfArms,
          titles: house.titles,
          region: house.region,
          currentLord: house.currentLord,
          founder: house.founder,
          heir: house.heir,
          overlord: house.overlord,
          cadetBranches: house.cadetBranches,
          swornMembers: house.swornMembers,
        })
      })

      housesContext.dispatch({
        type: "GET_HOUSES_SUCCESS",
        payload: { houses: tempHouses, error: "" },
      })
      console.log(tempHouses)
    })
    .catch((error) => {
      housesContext.dispatch({
        type: "GET_HOUSES_FAILURE",
        payload: { houses: [] as Array<IHouse>, error: error.message },
      })
    })
}
export default getHouses
