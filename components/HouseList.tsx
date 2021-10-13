import Link from "next/link"
import React, { useContext, useEffect, useState } from "react"
import HouseContext from "../context/house"
import getHouse from "../context/house/getHouse"
import { HouseContextProvider } from "../context/house/provider"
import { IHouse } from "../interfaces/Houses"
import getID from "../lib/getID"

const HouseList = ({ housesUrl }: { housesUrl: String[] }) => {
  return (
    <HouseContextProvider>
      <HouseListRender housesUrl={housesUrl} />
    </HouseContextProvider>
  )
}

const HouseListRender: React.FunctionComponent<{
  housesUrl: String[]
}> = ({ housesUrl }) => {
  const [houses, setHouses] = useState([] as Array<IHouse>)

  const houseContext = useContext(HouseContext)
  useEffect(() => {
    housesUrl.map((char) => {
      const charaterId = getID(char)
      getHouse(charaterId, houseContext)
    })
  }, [])

  useEffect(() => {
    setHouses((chars) => {
      if (chars && houseContext.state.house) {
        return [...chars, houseContext.state.house]
      } else {
        return []
      }
    })
  }, [houseContext])
  return (
    <div className="">
      {houses && (
        <>
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
