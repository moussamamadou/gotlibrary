import type { NextPage } from "next"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import axios from "axios"
import formatDate from "../lib/formatDate"
import getID from "../lib/getID"
interface IBook {
  name: string
  released: string
  isbn: string
  url: string
}

const Home: NextPage = () => {
  const [books, setBooks] = useState<Array<IBook>>()
  const [loading, setLoading] = useState<Boolean>(true)
  const [error, setError] = useState<String>("")

  const getBooks = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/books?pageSize=15`)
      .then((res: any) => {
        let tempBooks: Array<IBook> = []
        res.data.map((books: any) => {
          tempBooks.push({
            name: books.name,
            released: books.released,
            isbn: books.isbn,
            url: books.url,
          })
        })
        setLoading(false)
        setBooks(tempBooks)
      })
      .catch((error) => {
        setLoading(false)
        setError(`Character List : ${error.message}`)
      })
  }

  useEffect(() => {
    getBooks()
  }, [])

  if (loading) return <div>Loading ...</div>

  if (error) return <div>{error} ...</div>

  return (
    <div className="">
      <div className="flex flex-wrap items-center justify-around">
        <h2 className="text-3xl font-bold mb-5">All Ice and Fire Books</h2>
        {books &&
          books.map((book) => (
            <Link href={`/books/${getID(book.url)}`} key={book.isbn}>
              <a className="grid grid-cols-3  p-4 mt-2 w-full text-left border mx-2 rounded-xl hover:text-indigo-600 focus:text-indigo-600">
                <div> {book.name} </div>
                <div> {formatDate(book.released)}</div>
                <div> ISBN: {book.isbn}</div>
              </a>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default Home
