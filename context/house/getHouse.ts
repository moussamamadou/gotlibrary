import axios from "axios"
import _ from "lodash"
import { IHouse, IHouseContext } from "../../interfaces/Houses"

const getHouse = (
  slug: string | string[] | undefined,
  houseContext: IHouseContext
) => {
  if (slug) {
    if (_.isString(slug)) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API}/houses/${slug}`)
        .then((res: any) => {
          let tempHouse: IHouse = {
            name: res.data.name,
            coatOfArms: res.data.coatOfArms,
            titles: res.data.titles,
            region: res.data.region,
            currentLord: res.data.currentLord,
            founder: res.data.founder,
            heir: res.data.heir,
            overlord: res.data.overlord,
            cadetBranches: res.data.cadetBranches,
            swornMembers: res.data.swornMembers,
          }

          houseContext.dispatch({
            type: "GET_HOUSE_SUCCESS",
            payload: { house: tempHouse, error: "" },
          })
        })
        .catch((error) => {
          houseContext.dispatch({
            type: "GET_HOUSE_FAILURE",
            payload: { house: {} as IHouse, error: error.message },
          })
        })
    } else {
      houseContext.dispatch({
        type: "GET_HOUSE_FAILURE",
        payload: {
          house: {} as IHouse,
          error: "This House Does not exist",
        },
      })
    }
  }
}
export default getHouse
