import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import getID from "../lib/getID"

interface ICharacter {
  name: string
  url: string
}

const CharacterList = ({ charactersUrl }: { charactersUrl: String[] }) => {
  const [characters, setCharaters] = useState<Array<ICharacter>>([])
  const [loading, setLoading] = useState<Boolean>(true)
  const [error, setError] = useState<String>("")

  const getCharacter = (charaterId: String | undefined) => {
    if (charaterId)
      axios
        .get(`${process.env.NEXT_PUBLIC_API}/characters/${charaterId} `)
        .then((res) => {
          let tempCharacter: ICharacter = {
            name: res.data.name,
            url: res.data.url,
          }
          setLoading(false)
          setCharaters((state) => [...state, tempCharacter])
        })
        .catch((error) => {
          setLoading(false)
          setError(`Character List : ${error.message}`)
        })
  }

  useEffect(() => {
    setCharaters([])
    charactersUrl.map((char) => {
      const charaterId = getID(char)
      getCharacter(charaterId)
    })
  }, [])

  if (loading) return <div>Loading ...</div>

  if (error) return <div>{error} ...</div>

  return (
    <div className="">
      {characters &&
        characters.map((character, index) =>
          character.name ? (
            <Link href={`/characters/${getID(character.url)} `} key={index}>
              <a className="grid grid-cols-3  p-4 mt-2 w-full text-left border rounded-xl hover:text-indigo-600 focus:text-indigo-600">
                {character.name}
              </a>
            </Link>
          ) : null
        )}
    </div>
  )
}

export default CharacterList
