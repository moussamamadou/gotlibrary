import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import formatDate from "../lib/formatDate"
import getID from "../lib/getID"

interface IHouse {
  name: string
  released: string
  isbn: string
  url: string
}

const HouseList = ({ housesUrl }: { housesUrl: String[] }) => {
  const [houses, setHouses] = useState<Array<IHouse>>([])
  const [loading, setLoading] = useState<Boolean>(true)
  const [error, setError] = useState<String>("")

  const getHouse = (charaterId: String | undefined) => {
    if (charaterId)
      axios
        .get(`${process.env.NEXT_PUBLIC_API}/houses/${charaterId}`)
        .then((res) => {
          let tempHouse: IHouse = {
            name: res.data.name,
            released: res.data.released,
            isbn: res.data.isbn,
            url: res.data.url,
          }
          setLoading(false)
          setHouses((state) => [...state, tempHouse])
          console.log("-Houses : ", houses)
        })
        .catch((error) => {
          setLoading(false)
          setError(`House List : ${error.message}`)
        })
  }

  useEffect(() => {
    setHouses([])
    housesUrl.map((char) => {
      const charaterId = getID(char)
      getHouse(charaterId)
    })
  }, [])

  if (loading) return <div>Loading ...</div>

  if (error) return <div>{error} ...</div>

  return (
    <div className="">
      {houses && (
        <>
          <strong className="text-2xl">Houses : </strong>
          {houses.map((house, index) => (
            <Link href={`/houses/${getID(house.url)}`} key={index}>
              <a className="grid p-4 mt-2 w-full text-left border rounded-xl hover:text-indigo-600 focus:text-indigo-600">
                <div> {house.name}</div>
              </a>
            </Link>
          ))}
        </>
      )}
    </div>
  )
}

export default HouseList
