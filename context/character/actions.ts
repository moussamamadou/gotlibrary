import { ICharacter, ICharacterActions } from "../../interfaces/Characters"

export const characterRequested = (): ICharacterActions => {
  return {
    type: "GET_CHARACTER_REQUEST",
    payload: { character: {} as ICharacter, error: "" },
  }
}

export const characterLoaded = (character: ICharacter): ICharacterActions => {
  return {
    type: "GET_CHARACTER_SUCCESS",
    payload: { character, error: "" },
  }
}

export const characterError = (error: string): ICharacterActions => {
  return {
    type: "GET_CHARACTER_FAILURE",
    payload: { character: {} as ICharacter, error },
  }
}
