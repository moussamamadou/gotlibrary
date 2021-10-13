import { NextPage } from "next"
import Link from "next/link"
import React, { useContext, useEffect, useState } from "react"
import HousesContext from "../../context/houses"
import getHouses from "../../context/houses/getHouses"
import { HousesContextProvider } from "../../context/houses/provider"
import getID from "../../lib/getID"

const HousesPage: NextPage = () => {
  return (
    <>
      <HousesContextProvider>
        <HousesRender />
      </HousesContextProvider>
    </>
  )
}

const HousesRender: React.FC = () => {
  const housesContext = useContext(HousesContext)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    getHouses(currentPage, 6, housesContext)
  }, [currentPage])

  useEffect(() => {
    console.log(housesContext.state.pagination)
  }, [housesContext])

  if (housesContext.state.loading) return <div>Loading ...</div>

  if (housesContext.state.error)
    return <div>{housesContext.state.error} ...</div>

  return (
    <div className="">
      <div className="flex flex-wrap items-center justify-around mx-2">
        <h2 className="text-3xl w-full text-left font-bold mb-5">Houses</h2>
        {housesContext.state.houses &&
          housesContext.state.houses.map((house, index) => (
            <Link href={`/houses/${getID(house.url)}`} key={index}>
              <a className="grid grid-cols-2  p-4 mt-2 w-full text-left border  rounded-xl hover:text-indigo-600 focus:text-indigo-600">
                <div>{house.name || `No Name House ${getID(house.url)}`}</div>
                <div>
                  {house.titles &&
                    house.titles.length > 0 &&
                    house.titles.toString().replaceAll(",", ", ")}
                </div>
              </a>
            </Link>
          ))}
        <div className="flex flex-row justify-around">
          {housesContext.state.pagination && (
            <>
              {housesContext.state.pagination.prev && (
                <button
                  onClick={() =>
                    setCurrentPage(
                      Number(housesContext.state.pagination.prev?.page)
                    )
                  }
                  className="p-4 mt-2 w-full  text-xl font-bold text-indigo-600 hover:underline "
                >
                  <div> Previous </div>
                </button>
              )}
              {housesContext.state.pagination.next && (
                <button
                  onClick={() =>
                    setCurrentPage(
                      Number(housesContext.state.pagination.next?.page)
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
export default HousesPage
