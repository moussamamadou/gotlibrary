import { NextPage } from "next"
import { useRouter } from "next/dist/client/router"
import React, { useContext, useEffect } from "react"
import CharacterList from "../../components/CharacterList"
import HouseList from "../../components/HouseList"
import HouseContext from "../../context/house"
import getHouse from "../../context/house/getHouse"
import { HouseContextProvider } from "../../context/house/provider"

const HousePage: NextPage = () => {
  return (
    <HouseContextProvider>
      <HousePageRender />
    </HouseContextProvider>
  )
}

const HousePageRender: React.FC = () => {
  const router = useRouter()

  const houseContext = useContext(HouseContext)

  const { slug } = router.query

  useEffect(() => {
    getHouse(slug, houseContext)
  }, [slug])

  if (houseContext.state.loading)
    return (
      <div className="flex flex-wrap items-center justify-around max-w-4xl sm:w-full">
        Loading ...
      </div>
    )

  if (houseContext.state.error)
    return (
      <div className="flex flex-wrap items-center justify-around max-w-4xl sm:w-full">
        {houseContext.state.error} ...
      </div>
    )

  return (
    <div className="flex flex-col text-left text-lg gap-4">
      {houseContext.state.house && (
        <>
          <div className="w-full text-3xl text-center  mb-2">
            <strong>House :</strong> {houseContext.state.house.name}
          </div>
          <div className="w-full">
            <strong>Coat Of Arms :</strong>{" "}
            {houseContext.state.house.coatOfArms || "None"}
          </div>
          <div className="w-full">
            <strong>Region :</strong>{" "}
            {houseContext.state.house.region || "Unknown"}
          </div>
          <div className="w-full">
            <strong>Current Lord :</strong>
            {houseContext.state.house.currentLord && (
              <CharacterList
                charactersUrl={[houseContext.state.house.currentLord]}
              />
            )}
          </div>
          <div className="w-full">
            <strong>Founder :</strong>
            {houseContext.state.house.founder && (
              <CharacterList
                charactersUrl={[houseContext.state.house.founder]}
              />
            )}
          </div>
          <div className="w-full">
            <strong>Heir :</strong>
            {houseContext.state.house.heir && (
              <CharacterList charactersUrl={[houseContext.state.house.heir]} />
            )}
          </div>
          <div className="w-full">
            <strong>Overlord :</strong>
            {houseContext.state.house.overlord && (
              <HouseList housesUrl={[houseContext.state.house.overlord]} />
            )}
          </div>
          <div className="w-full">
            {houseContext.state.house.cadetBranches &&
              houseContext.state.house.cadetBranches.length > 0 && (
                <>
                  <strong>Cadet Branches :</strong>
                  <HouseList
                    housesUrl={houseContext.state.house.cadetBranches}
                  />
                </>
              )}
          </div>
          <div className="w-full">
            {houseContext.state.house.swornMembers &&
              houseContext.state.house.swornMembers.length > 0 && (
                <>
                  <strong>Sworn Members :</strong>
                  <CharacterList
                    charactersUrl={houseContext.state.house.swornMembers}
                  />
                </>
              )}
          </div>
        </>
      )}
    </div>
  )
}

export default HousePage
function houseContext(slug: string | string[] | undefined, houseContext: any) {
  throw new Error("Function not implemented.")
}
