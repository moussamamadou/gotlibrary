import axios from "axios"
import _ from "lodash"
import { IHouse, IHouseContext } from "../../interfaces/Houses"
import { houseError, houseLoaded } from "./actions"

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
            url: res.data.url,
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

          houseContext.dispatch(houseLoaded(tempHouse))
        })
        .catch((error) => {
          houseContext.dispatch(houseError(error.message))
        })
    } else {
      houseContext.dispatch(houseError("This House Does not exist"))
    }
  }
}
export default getHouse
