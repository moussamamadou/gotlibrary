import { ICharacter, ICharacterActions } from "../../interfaces/Characters"

export const charactersRequested = (): ICharacterActions => {
  return {
    type: "GET_CHARACTER_REQUEST",
    payload: { character: {} as ICharacter, error: "" },
  }
}

export const charactersLoaded = (character: ICharacter): ICharacterActions => {
  return {
    type: "GET_CHARACTER_SUCCESS",
    payload: { character, error: "" },
  }
}

export const charactersError = (error: string): ICharacterActions => {
  return {
    type: "GET_CHARACTER_FAILURE",
    payload: { character: {} as ICharacter, error },
  }
}
