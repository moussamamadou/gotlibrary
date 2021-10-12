import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import formatDate from "../lib/formatDate"
import getID from "../lib/getID"

interface IBook {
  name: string
  released: string
  isbn: string
  url: string
}

const BookList = ({ booksUrl }: { booksUrl: String[] }) => {
  const [books, setCharaters] = useState<Array<IBook>>([])
  const [loading, setLoading] = useState<Boolean>(true)
  const [error, setError] = useState<String>("")

  const getBook = (charaterId: String | undefined) => {
    if (charaterId)
      axios
        .get(`${process.env.NEXT_PUBLIC_API}/books/${charaterId}`)
        .then((res) => {
          let tempBook: IBook = {
            name: res.data.name,
            released: res.data.released,
            isbn: res.data.isbn,
            url: res.data.url,
          }
          setLoading(false)
          setCharaters((state) => [...state, tempBook])
        })
        .catch((error) => {
          setLoading(false)
          setError(`Book List : ${error.message}`)
        })
  }

  useEffect(() => {
    setCharaters([])
    booksUrl.map((char) => {
      const charaterId = getID(char)
      getBook(charaterId)
    })
  }, [])

  if (loading) return <div>Loading ...</div>

  if (error) return <div>{error} ...</div>

  return (
    <div className="">
      {books &&
        books.map((book, index) => (
          <Link href={`/books/${getID(book.url)}`} key={index}>
            <a className="grid grid-cols-3  p-4 mt-2 w-full text-left border rounded-xl hover:text-indigo-600 focus:text-indigo-600">
              <div> {book.name}</div>
              <div> {formatDate(book.released)}</div>
              <div> ISBN: {book.isbn}</div>
            </a>
          </Link>
        ))}
    </div>
  )
}

export default BookList
