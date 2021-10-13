export interface ICharacter {
  url: string
  name: string
  gender: string
  culture: string
  title: Array<String>
  alias: Array<String>
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

export interface ICharacterContext {
  state: ICharacterState
  dispatch: React.Dispatch<ICharacterActions>
}
