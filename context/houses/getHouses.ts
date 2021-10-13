import axios from "axios"
import _ from "lodash"
import { IHouse, IHousesContext } from "../../interfaces/Houses"
import { IPagination } from "../../interfaces/Pagination"
import parse from "parse-link-header"

const getHouses = (
  page: number,
  pageSize: number,
  housesContext: IHousesContext
) => {
  housesContext.dispatch({
    type: "GET_HOUSES_REQUEST",
    payload: {
      houses: [] as Array<IHouse>,
      error: "",
      pagination: {} as IPagination,
    },
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
      housesContext.dispatch({
        type: "GET_HOUSES_SUCCESS",
        payload: {
          houses: tempHouses,
          error: "",
          pagination: pagination,
        },
      })
    })
    .catch((error) => {
      housesContext.dispatch({
        type: "GET_HOUSES_FAILURE",
        payload: {
          houses: [] as Array<IHouse>,
          error: error.message,
          pagination: {} as IPagination,
        },
      })
    })
}
export default getHouses
