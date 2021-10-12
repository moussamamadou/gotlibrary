import axios from "axios"
import _ from "lodash"
import { ICharacter, ICharacterContext } from "../../interfaces/Characters"

const getCharacter = (
  slug: string | string[] | undefined,
  characterContext: ICharacterContext
) => {
  if (slug) {
    if (_.isString(slug)) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API}/characters/${slug}`)
        .then((res: any) => {
          let tempCharacter: ICharacter = {
            name: res.data.name,
            gender: res.data.gender,
            culture: res.data.culture,
            title: res.data.titles,
            alias: res.data.alias,
            died: res.data.died,
            born: res.data.born,
            allegiances: res.data.allegiances,
            povBooks: res.data.povBooks,
          }

          characterContext.dispatch({
            type: "GET_CHARACTER_SUCCESS",
            payload: { character: tempCharacter, error: "" },
          })
        })
        .catch((error) => {
          characterContext.dispatch({
            type: "GET_CHARACTER_FAILURE",
            payload: { character: {} as ICharacter, error: error.message },
          })
        })
    } else {
      characterContext.dispatch({
        type: "GET_CHARACTER_FAILURE",
        payload: {
          character: {} as ICharacter,
          error: "This Character Does not exist",
        },
      })
    }
  }
}
export default getCharacter
