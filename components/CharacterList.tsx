import Link from "next/link"
import React, { useContext, useEffect, useState } from "react"
import CharacterContext from "../context/character"
import getCharacter from "../context/character/getCharacter"
import { CharacterContextProvider } from "../context/character/provider"
import { ICharacter } from "../interfaces/Characters"
import getID from "../lib/getID"

const CharacterList = ({ charactersUrl }: { charactersUrl: String[] }) => {
  return (
    <CharacterContextProvider>
      <CharacterListRender charactersUrl={charactersUrl} />
    </CharacterContextProvider>
  )
}

const CharacterListRender: React.FunctionComponent<{
  charactersUrl: String[]
}> = ({ charactersUrl }) => {
  const [characters, setCharacters] = useState([] as Array<ICharacter>)

  const characterContext = useContext(CharacterContext)
  useEffect(() => {
    charactersUrl.map((char) => {
      const charaterId = getID(char)
      getCharacter(charaterId, characterContext)
    })
  }, [])

  useEffect(() => {
    setCharacters((chars) => {
      if (chars && characterContext.state.character) {
        return [...chars, characterContext.state.character]
      } else {
        return []
      }
    })
  }, [characterContext])

  return (
    <div className="">
      {characters &&
        characters.map((character, index) =>
          character.name ? (
            <Link href={`/characters/${getID(character.url)} `} key={index}>
              <a className="grid grid-cols-2  p-4 mt-2 w-full text-left border rounded-xl hover:text-indigo-600 focus:text-indigo-600">
                <div>
                  {character.name ||
                    `No Name Character ${getID(character.url)}`}
                </div>
                <div>
                  {character.aliases &&
                    character.aliases.length > 0 &&
                    `Alias : ${character.aliases
                      .toString()
                      .replaceAll(",", ", ")}`}
                </div>
              </a>
            </Link>
          ) : null
        )}
    </div>
  )
}

export default CharacterList
