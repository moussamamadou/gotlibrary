import { NextPage } from "next"
import Link from "next/link"
import React, { useContext, useEffect, useState } from "react"
import BooksContext from "../../context/books"
import getBooks from "../../context/books/getBooks"
import { BooksContextProvider } from "../../context/books/provider"
import formatDate from "../../lib/formatDate"
import getID from "../../lib/getID"

const BooksPage: NextPage = () => {
  return (
    <>
      <BooksContextProvider>
        <BooksRender />
      </BooksContextProvider>
    </>
  )
}

const BooksRender: React.FC = () => {
  const booksContext = useContext(BooksContext)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    getBooks(currentPage, 6, booksContext)
  }, [currentPage])

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
        <div className="flex flex-row justify-around">
          {booksContext.state.pagination && (
            <>
              {booksContext.state.pagination.prev && (
                <button
                  onClick={() =>
                    setCurrentPage(
                      Number(booksContext.state.pagination.prev?.page)
                    )
                  }
                  className="p-4 mt-2 w-full  text-xl font-bold text-indigo-600 hover:underline "
                >
                  <div> Previous </div>
                </button>
              )}
              {booksContext.state.pagination.next && (
                <button
                  onClick={() =>
                    setCurrentPage(
                      Number(booksContext.state.pagination.next?.page)
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
export default BooksPage
