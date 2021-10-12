import { createContext } from "react"
import { ICharacterState, ICharacterContext } from "../../interfaces/Characters"

export const iniatialCharacterState = {} as ICharacterState

const CharacterContext = createContext({} as ICharacterContext)

export default CharacterContext
