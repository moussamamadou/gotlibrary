import { NextPage } from "next"
import Link from "next/link"
import React, { useContext, useEffect, useReducer, useState } from "react"
import CharactersContext from "../../context/characters"
import getCharacters from "../../context/characters/getCharacters"
import { CharactersContextProvider } from "../../context/characters/provider"
import formatDate from "../../lib/formatDate"
import getID from "../../lib/getID"

const CharactersPage: NextPage = () => {
  return (
    <>
      <CharactersContextProvider>
        <CharactersRender />
      </CharactersContextProvider>
    </>
  )
}

const CharactersRender: React.FC = () => {
  const charactersContext = useContext(CharactersContext)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    getCharacters(currentPage, 6, charactersContext)
  }, [currentPage])

  useEffect(() => {
    console.log(charactersContext.state.pagination)
  }, [charactersContext])

  if (charactersContext.state.loading) return <div>Loading ...</div>

  if (charactersContext.state.error)
    return <div>{charactersContext.state.error} ...</div>

  return (
    <div className="">
      <div className="flex flex-wrap items-center justify-around mx-2">
        <h2 className="text-3xl w-full text-left font-bold mb-5">Characters</h2>
        {charactersContext.state.characters &&
          charactersContext.state.characters.map((character, index) => (
            <Link href={`/characters/${getID(character.url)}`} key={index}>
              <a className="grid grid-cols-2  p-4 mt-2 w-full text-left border  rounded-xl hover:text-indigo-600 focus:text-indigo-600">
                <div>
                  {character.name ||
                    `No Name Character ${getID(character.url)}`}
                </div>
                <div>
                  {character.aliases &&
                    character.aliases.length > 0 &&
                    "Alias : " +
                      character.aliases.toString().replaceAll(",", ", ")}
                </div>
              </a>
            </Link>
          ))}
        <div className="flex flex-row justify-around">
          {charactersContext.state.pagination && (
            <>
              {charactersContext.state.pagination.prev && (
                <button
                  onClick={() =>
                    setCurrentPage(
                      Number(charactersContext.state.pagination.prev?.page)
                    )
                  }
                  className="p-4 mt-2 w-full  text-xl font-bold text-indigo-600 hover:underline "
                >
                  <div> Previous </div>
                </button>
              )}
              {charactersContext.state.pagination.next && (
                <button
                  onClick={() =>
                    setCurrentPage(
                      Number(charactersContext.state.pagination.next?.page)
                    )
                  }
                  className="p-4 mt-2 w-full text-xl font-bold text-indigo-600 hover:underline "
                >
                  <div> Next </div>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default CharactersPage
