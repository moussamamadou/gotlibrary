import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import axios from "axios"
import moment from "moment"

const getID = (url: String) => url.split("/").pop()

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
      .then((res) => {
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
      <Head>
        <title>Home - GOT LIBRARY</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-wrap items-center justify-around max-w-4xl sm:w-full">
        <h2 className="text-3xl font-bold mb-5">All Ice and Fire Books</h2>
        {books &&
          books.map((book) => (
            <Link href={""} key={book.isbn}>
              <a className="grid grid-cols-3  p-4 mt-2 w-full text-left border mx-2 rounded-xl hover:text-indigo-600 focus:text-indigo-600">
                <div> {book.name} </div>
                <div> {moment(book.released).format("Do MMMM YYYY")}</div>
                <div> ISBN: {book.isbn}</div>
              </a>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default Home
