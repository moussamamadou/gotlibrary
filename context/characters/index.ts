import { createContext } from "react"
import {
  ICharactersState,
  ICharactersContext,
} from "../../interfaces/Characters"

export const iniatialCharactersState = {} as ICharactersState

const CharactersContext = createContext({} as ICharactersContext)

export default CharactersContext
