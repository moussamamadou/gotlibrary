import type { NextPage } from "next"
import Link from "next/link"
import React, { useContext, useEffect } from "react"
import formatDate from "../lib/formatDate"
import getID from "../lib/getID"
import { BooksContextProvider } from "../context/books/provider"
import BooksContext from "../context/books"
import CharactersContext from "../context/characters"
import getBooks from "../context/books/getBooks"
import getCharacters from "../context/characters/getCharacters"
import { CharactersContextProvider } from "../context/characters/provider"
import getHouses from "../context/houses/getHouses"
import HousesContext from "../context/houses"
import { HousesContextProvider } from "../context/houses/provider"

const HomePage: NextPage = () => {
  return (
    <>
      <BooksContextProvider>
        <BooksRender />
      </BooksContextProvider>
      <CharactersContextProvider>
        <CharactersRender />
      </CharactersContextProvider>
      <HousesContextProvider>
        <HousesRender />
      </HousesContextProvider>
    </>
  )
}

const BooksRender: React.FC = () => {
  const booksContext = useContext(BooksContext)

  useEffect(() => {
    getBooks(1, 4, booksContext)
  }, [])

  if (booksContext.state.loading) return <div>Loading ...</div>

  if (booksContext.state.error) return <div>{booksContext.state.error} ...</div>

  return (
    <div className="">
      <div className="flex flex-wrap items-center justify-around mx-2">
        <h2 className="text-3xl w-full text-left font-bold mb-5">Books</h2>
        {booksContext.state.books &&
          booksContext.state.books.map((book) => (
            <Link href={`/books/${getID(book.url)}`} key={book.isbn}>
              <a className="grid grid-cols-3  p-4 mt-2 w-full text-left border  rounded-xl hover:text-indigo-600 focus:text-indigo-600">
                <div> {book.name} </div>
                <div> {formatDate(book.released)}</div>
                <div> ISBN: {book.isbn}</div>
              </a>
            </Link>
          ))}
        <Link href={`/books`}>
          <a className="p-4 mt-2 w-full text-right text-xl font-bold text-indigo-600 hover:underline ">
            <div> View More Books </div>
          </a>
        </Link>
      </div>
    </div>
  )
}

const CharactersRender: React.FC = () => {
  const charactersContext = useContext(CharactersContext)

  useEffect(() => {
    getCharacters(1, 4, charactersContext)
  }, [])

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
        <Link href={`/characters`}>
          <a className="p-4 mt-2 w-full text-right text-xl font-bold text-indigo-600 hover:underline ">
            <div> View More Characters </div>
          </a>
        </Link>
      </div>
    </div>
  )
}

const HousesRender: React.FC = () => {
  const housesContext = useContext(HousesContext)

  useEffect(() => {
    getHouses(1, 4, housesContext)
  }, [])

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

        <Link href={`/houses`}>
          <a className="p-4 mt-2 w-full text-right text-xl font-bold text-indigo-600 hover:underline ">
            <div> View More Houses </div>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default HomePage
