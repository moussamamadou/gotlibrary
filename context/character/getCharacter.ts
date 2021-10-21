import axios from "axios"
import _ from "lodash"
import { ICharacter, ICharacterContext } from "../../interfaces/Characters"
import { characterError, characterLoaded } from "./actions"

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
            url: res.data.url,
            name: res.data.name,
            gender: res.data.gender,
            culture: res.data.culture,
            title: res.data.titles,
            aliases: res.data.aliases,
            died: res.data.died,
            born: res.data.born,
            allegiances: res.data.allegiances,
            povBooks: res.data.povBooks,
          }

          characterContext.dispatch(characterLoaded(tempCharacter))
        })
        .catch((error) => {
          characterContext.dispatch(characterError(error.message))
        })
    } else {
      characterContext.dispatch(characterError("This Character Does not exist"))
    }
  }
}
export default getCharacter
