import Link from "next/link"
import React, { useContext, useEffect, useState } from "react"
import BookContext from "../context/book"
import getBook from "../context/book/getBook"
import { BookContextProvider } from "../context/book/provider"
import { IBook } from "../interfaces/Books"
import formatDate from "../lib/formatDate"
import getID from "../lib/getID"

const BookList = ({ booksUrl }: { booksUrl: String[] }) => {
  return (
    <BookContextProvider>
      <BookListRender booksUrl={booksUrl} />
    </BookContextProvider>
  )
}

const BookListRender: React.FunctionComponent<{
  booksUrl: String[]
}> = ({ booksUrl }) => {
  const [books, setBooks] = useState([] as Array<IBook>)

  const bookContext = useContext(BookContext)
  useEffect(() => {
    booksUrl.map((char) => {
      const charaterId = getID(char)
      getBook(charaterId, bookContext)
    })
  }, [])

  useEffect(() => {
    setBooks((chars) => {
      if (chars && bookContext.state.book) {
        return [...chars, bookContext.state.book]
      } else {
        return []
      }
    })
  }, [bookContext])

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
