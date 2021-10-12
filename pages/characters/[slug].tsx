import axios from "axios"
import { useRouter } from "next/dist/client/router"
import React, { useEffect, useState } from "react"
import BookList from "../../components/BookList"
import HouseList from "../../components/HouseList"

interface ICharacter {
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

const CharacterPage = () => {
  const router = useRouter()

  const { slug } = router.query

  const [character, setCharacter] = useState<ICharacter>()
  const [loading, setLoading] = useState<Boolean>(true)
  const [error, setError] = useState<String>("")

  const getCharacter = () => {
    if (slug)
      axios
        .get(`${process.env.NEXT_PUBLIC_API}/characters/${slug}`)
        .then((res) => {
          console.log(res.data)
          let tempCharacter: ICharacter = {
            name: res.data.name,
            gender: res.data.gender,
            culture: res.data.culture,
            title: res.data.titles,
            alias: res.data.alias,
            died: res.data.died,
            born: res.data.born,
            allegiances: res.data.allegiances,
            povBooks: res.data.povBooks,
          }
          setLoading(false)
          setCharacter(tempCharacter)
        })
        .catch((error) => {
          setLoading(false)
          setError(`Character Page : ${error.message}`)
        })
  }

  useEffect(() => {
    getCharacter()
  }, [slug])

  useEffect(() => {
    console.log(character)
  }, [character])

  if (loading)
    return (
      <div className="flex flex-wrap items-center justify-around max-w-4xl sm:w-full">
        Loading ...
      </div>
    )

  if (error)
    return (
      <div className="flex flex-wrap items-center justify-around max-w-4xl sm:w-full">
        {error} ...
      </div>
    )

  return (
    <div className="flex flex-col text-left text-lg gap-4">
      {character && (
        <>
          <div className="w-full text-3xl text-center  mb-2">
            <strong>Character :</strong> {character.name}
          </div>
          <div className="w-full">
            <strong>Title :</strong>&nbsp;
            {character.title.toString().replaceAll(",", ", ") || "No Title"}
          </div>
          <div className="w-full">
            <strong>Born :</strong> {character.born || "Unknown"}
          </div>
          <div className="w-full">
            <strong>Gender :</strong> {character.gender || "Unknown"}
          </div>
          <div className="w-full ">
            <strong>Culture :</strong> {character.culture || "Unknown"}
          </div>
          <div className="w-full ">
            {character.allegiances && character.allegiances.length > 0 && (
              <>
                <strong className="text-2xl">House of allegiances : </strong>
                <HouseList housesUrl={character.allegiances} />
              </>
            )}
          </div>
          <div className="w-full ">
            {character.povBooks && character.povBooks.length > 0 && (
              <>
                <strong className="text-2xl">POV Books : </strong>
                <BookList booksUrl={character.povBooks} />
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default CharacterPage
