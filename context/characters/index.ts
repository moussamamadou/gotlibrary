import { createContext } from "react"
import {
  ICharactersState,
  ICharactersContext,
  ICharacter,
} from "../../interfaces/Characters"
import { IPagination } from "../../interfaces/Pagination"

export const iniatialCharactersState = {
  characters: [] as Array<ICharacter>,
  loading: true,
  error: "",
  pagination: {} as IPagination,
} as ICharactersState

const CharactersContext = createContext({} as ICharactersContext)

export default CharactersContext
