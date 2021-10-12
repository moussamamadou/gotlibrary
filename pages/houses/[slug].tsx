import axios from "axios"
import { useRouter } from "next/dist/client/router"
import React, { useEffect, useState } from "react"
import CharacterList from "../../components/CharacterList"
import HouseList from "../../components/HouseList"
import formatDate from "../../lib/formatDate"

interface IHouse {
  name: string
  coatOfArms: string
  titles: Array<string>
  region: string
  currentLord: string
  founder: string
  heir: string
  overlord: string
  cadetBranches: Array<string>
  swornMembers: Array<string>
}

const HousePage = () => {
  const router = useRouter()

  const { slug } = router.query

  const [house, setHouse] = useState<IHouse>()
  const [loading, setLoading] = useState<Boolean>(true)
  const [error, setError] = useState<String>("")

  const getHouse = () => {
    if (slug)
      axios
        .get(`${process.env.NEXT_PUBLIC_API}/houses/${slug}`)
        .then((res) => {
          console.log(res.data)
          let tempHouse: IHouse = {
            name: res.data.name,
            coatOfArms: res.data.coatOfArms,
            titles: res.data.titles,
            region: res.data.region,
            currentLord: res.data.currentLord,
            founder: res.data.founder,
            heir: res.data.heir,
            overlord: res.data.overlord,
            cadetBranches: res.data.cadetBranches,
            swornMembers: res.data.swornMembers,
          }
          setLoading(false)
          setHouse(tempHouse)
        })
        .catch((error) => {
          setLoading(false)
          setError(`House Page : ${error.message}`)
        })
  }

  useEffect(() => {
    getHouse()
  }, [slug])
  useEffect(() => {
    console.log(house)
  }, [house])

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
      {house && (
        <>
          <div className="w-full text-3xl text-center  mb-2">
            <strong>House :</strong> {house.name}
          </div>
          <div className="w-full">
            <strong>Coat Of Arms :</strong> {house.coatOfArms || "None"}
          </div>
          <div className="w-full">
            <strong>Region :</strong> {house.region || "Unknown"}
          </div>
          <div className="w-full">
            <strong>Current Lord :</strong>
            {house.currentLord && (
              <CharacterList charactersUrl={[house.currentLord]} />
            )}
          </div>
          <div className="w-full">
            <strong>Founder :</strong>
            {house.founder && <CharacterList charactersUrl={[house.founder]} />}
          </div>
          <div className="w-full">
            <strong>Heir :</strong>
            {house.heir && <CharacterList charactersUrl={[house.heir]} />}
          </div>
          <div className="w-full">
            <strong>Overlord :</strong>
            {house.overlord && <HouseList housesUrl={[house.overlord]} />}
          </div>
          <div className="w-full">
            {house.cadetBranches && house.cadetBranches.length > 0 && (
              <>
                <strong>Cadet Branches :</strong>
                <HouseList housesUrl={house.cadetBranches} />
              </>
            )}
          </div>
          <div className="w-full">
            <strong>Sworn Members :</strong>
            {house.swornMembers && house.swornMembers.length > 0 && (
              <CharacterList charactersUrl={house.swornMembers} />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default HousePage
