import { IPagination } from "./Pagination"

export interface ICharacter {
  url: string
  name: string
  gender: string
  culture: string
  title: Array<String>
  aliases: Array<String>
  born: string
  died: string
  allegiances: Array<String>
  povBooks: Array<String>
}
export interface ICharacterState {
  character: ICharacter
  loading: boolean
  error: string
}
export interface ICharactersState {
  characters: Array<ICharacter>
  loading: boolean
  error: string
  pagination: IPagination
}
export interface ICharacterActions {
  type:
    | "GET_CHARACTER_REQUEST"
    | "GET_CHARACTER_SUCCESS"
    | "GET_CHARACTER_FAILURE"
  payload: {
    character: ICharacter
    error: string
  }
}
export interface ICharactersActions {
  type:
    | "GET_CHARACTERS_REQUEST"
    | "GET_CHARACTERS_SUCCESS"
    | "GET_CHARACTERS_FAILURE"
  payload: {
    characters: Array<ICharacter>
    error: string
    pagination: IPagination
  }
}

export interface ICharacterContext {
  state: ICharacterState
  dispatch: React.Dispatch<ICharacterActions>
}
export interface ICharactersContext {
  state: ICharactersState
  dispatch: React.Dispatch<ICharactersActions>
}
