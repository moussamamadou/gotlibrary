import axios from "axios"
import _ from "lodash"
import { ICharacter, ICharactersContext } from "../../interfaces/Characters"
import { IPagination } from "../../interfaces/Pagination"
import parse from "parse-link-header"

const getCharacters = (
  page: number,
  pageSize: number,
  charactersContext: ICharactersContext
) => {
  charactersContext.dispatch({
    type: "GET_CHARACTERS_REQUEST",
    payload: {
      characters: [] as Array<ICharacter>,
      error: "",
      pagination: {} as IPagination,
    },
  })
  const url = `${process.env.NEXT_PUBLIC_API}/characters?page=${page}&pageSize=${pageSize}`

  axios
    .get(url)
    .then((res: any) => {
      let tempCharacters: Array<ICharacter> = []
      res.data.map((character: any) => {
        tempCharacters.push({
          url: character.url,
          name: character.name,
          gender: character.gender,
          culture: character.culture,
          title: character.titles,
          aliases: character.aliases,
          died: character.died,
          born: character.born,
          allegiances: character.allegiances,
          povBooks: character.povBooks,
        })
      })

      console.log(tempCharacters[0])
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
      charactersContext.dispatch({
        type: "GET_CHARACTERS_SUCCESS",
        payload: {
          characters: tempCharacters,
          error: "",
          pagination: pagination,
        },
      })
    })
    .catch((error) => {
      charactersContext.dispatch({
        type: "GET_CHARACTERS_FAILURE",
        payload: {
          characters: [] as Array<ICharacter>,
          error: error.message,
          pagination: {} as IPagination,
        },
      })
    })
}
export default getCharacters
