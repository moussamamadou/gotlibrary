import { NextPage } from "next"
import { useRouter } from "next/dist/client/router"
import React, { useContext, useEffect } from "react"
import HouseList from "../../components/HouseList"
import { CharacterContextProvider } from "../../context/character/provider"
import CharacterContext from "../../context/character"
import getCharacter from "../../context/character/getCharacter"
import BookList from "../../components/BookList"

const CharacterPage: NextPage = () => {
  return (
    <CharacterContextProvider>
      <CharacterPageRender />
    </CharacterContextProvider>
  )
}

const CharacterPageRender: React.FC = () => {
  const router = useRouter()

  const characterContext = useContext(CharacterContext)

  const { slug } = router.query

  useEffect(() => {
    getCharacter(slug, characterContext)
  }, [slug])

  if (characterContext.state.loading)
    return (
      <div className="flex flex-wrap items-center justify-around max-w-4xl sm:w-full">
        Loading ...
      </div>
    )

  if (characterContext.state.error)
    return (
      <div className="flex flex-wrap items-center justify-around max-w-4xl sm:w-full">
        {characterContext.state.error} ...
      </div>
    )

  return (
    <div className="flex flex-col text-left text-lg gap-4">
      {characterContext.state.character && (
        <>
          <div className="w-full text-3xl text-center  mb-2">
            <strong>Character :</strong> {characterContext.state.character.name}
          </div>
          <div className="w-full">
            <strong>Title :</strong>&nbsp;
            {characterContext.state.character.title
              .toString()
              .replaceAll(",", ", ") || "No Title"}
          </div>
          <div className="w-full">
            <strong>Born :</strong>{" "}
            {characterContext.state.character.born || "Unknown"}
          </div>
          <div className="w-full">
            <strong>Gender :</strong>{" "}
            {characterContext.state.character.gender || "Unknown"}
          </div>
          <div className="w-full ">
            <strong>Culture :</strong>{" "}
            {characterContext.state.character.culture || "Unknown"}
          </div>
          <div className="w-full ">
            {characterContext.state.character.allegiances &&
              characterContext.state.character.allegiances.length > 0 && (
                <>
                  <strong className="text-2xl">House of allegiances : </strong>
                  <HouseList
                    housesUrl={characterContext.state.character.allegiances}
                  />
                </>
              )}
          </div>
          <div className="w-full ">
            {characterContext.state.character.povBooks &&
              characterContext.state.character.povBooks.length > 0 && (
                <>
                  <strong className="text-2xl">POV Books : </strong>
                  <BookList
                    booksUrl={characterContext.state.character.povBooks}
                  />
                </>
              )}
          </div>
        </>
      )}
    </div>
  )
}

export default CharacterPage
