import axios from "axios"
import _ from "lodash"
import { IHouse, IHousesContext } from "../../interfaces/Houses"
import { IPagination } from "../../interfaces/Pagination"
import parse from "parse-link-header"
import { housesError, housesLoaded, housesRequested } from "./actions"

const getHouses = (
  page: number,
  pageSize: number,
  housesContext: IHousesContext
) => {
  housesContext.dispatch(housesRequested())

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

      let tempPagination: any
      tempPagination = parse(res.headers.link)

      let pagination: IPagination = {
        first: {
          page: tempPagination.first.page,
          pageSize: tempPagination.first.pageSize,
          rel: tempPagination.first.rel,
          url: tempPagination.first.url,
        },
        last: {
          page: tempPagination.last.page,
          pageSize: tempPagination.last.pageSize,
          rel: tempPagination.last.rel,
          url: tempPagination.last.url,
        },
      }

      if (tempPagination.prev) {
        pagination = {
          ...pagination,
          prev: {
            page: tempPagination.prev.page,
            pageSize: tempPagination.prev.pageSize,
            rel: tempPagination.prev.rel,
            url: tempPagination.prev.url,
          },
        }
      }
      if (tempPagination.next) {
        pagination = {
          ...pagination,
          next: {
            page: tempPagination.next.page,
            pageSize: tempPagination.next.pageSize,
            rel: tempPagination.next.rel,
            url: tempPagination.next.url,
          },
        }
      }
      housesContext.dispatch(housesLoaded(tempHouses, tempPagination))
    })
    .catch((error) => {
      housesContext.dispatch(housesError(error.message))
    })
}
export default getHouses
