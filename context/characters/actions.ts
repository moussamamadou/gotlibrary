import { ICharacter, ICharactersActions } from "../../interfaces/Characters"

export const charactersRequested = (): ICharactersActions => {
  return {
    type: "GET_CHARACTERS_REQUEST",
    payload: { characters: [] as Array<ICharacter>, error: "" },
  }
}

export const charactersLoaded = (
  characters: Array<ICharacter>
): ICharactersActions => {
  return {
    type: "GET_CHARACTERS_SUCCESS",
    payload: { characters, error: "" },
  }
}

export const charactersError = (error: string): ICharactersActions => {
  return {
    type: "GET_CHARACTERS_FAILURE",
    payload: { characters: [] as Array<ICharacter>, error },
  }
}
