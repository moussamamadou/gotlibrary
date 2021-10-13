import axios from "axios"
import _ from "lodash"
import { ICharacter, ICharactersContext } from "../../interfaces/Characters"

const getCharacters = (
  page: number,
  pageSize: number,
  charactersContext: ICharactersContext
) => {
  charactersContext.dispatch({
    type: "GET_CHARACTERS_REQUEST",
    payload: { characters: [] as Array<ICharacter>, error: "" },
  })

  axios
    .get(
      `${process.env.NEXT_PUBLIC_API}/characters?isAlive=false&page=${page}&pageSize=${pageSize}`
    )
    .then((res: any) => {
      let tempCharacters: Array<ICharacter> = []
      res.data.map((character: any) => {
        tempCharacters.push({
          url: character.url,
          name: character.name,
          gender: character.gender,
          culture: character.culture,
          title: character.titles,
          alias: character.alias,
          died: character.died,
          born: character.born,
          allegiances: character.allegiances,
          povBooks: character.povBooks,
        })
      })

      charactersContext.dispatch({
        type: "GET_CHARACTERS_SUCCESS",
        payload: { characters: tempCharacters, error: "" },
      })
      console.log(tempCharacters)
    })
    .catch((error) => {
      charactersContext.dispatch({
        type: "GET_CHARACTERS_FAILURE",
        payload: { characters: [] as Array<ICharacter>, error: error.message },
      })
    })
}
export default getCharacters
