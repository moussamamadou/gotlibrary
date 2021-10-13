import { ICharacter, ICharactersActions } from "../../interfaces/Characters"
import { IPagination } from "../../interfaces/Pagination"

export const charactersRequested = (): ICharactersActions => {
  return {
    type: "GET_CHARACTERS_REQUEST",
    payload: {
      characters: [] as Array<ICharacter>,
      error: "",
      pagination: {} as IPagination,
    },
  }
}

export const charactersLoaded = (
  characters: Array<ICharacter>,
  pagination: IPagination
): ICharactersActions => {
  return {
    type: "GET_CHARACTERS_SUCCESS",
    payload: { characters, error: "", pagination: pagination },
  }
}

export const charactersError = (error: string): ICharactersActions => {
  return {
    type: "GET_CHARACTERS_FAILURE",
    payload: {
      characters: [] as Array<ICharacter>,
      error,
      pagination: {} as IPagination,
    },
  }
}
