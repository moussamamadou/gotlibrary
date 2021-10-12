import { NextPage } from "next"
import { useRouter } from "next/dist/client/router"
import React, { useContext, useEffect } from "react"
import CharacterList from "../../components/CharacterList"
import BookContext from "../../context/book"
import getBook from "../../context/book/getBook"
import { BookContextProvider } from "../../context/book/provider"
import formatDate from "../../lib/formatDate"

const BookPage: NextPage = () => {
  return (
    <BookContextProvider>
      <BookPageRender />
    </BookContextProvider>
  )
}

const BookPageRender: React.FC = () => {
  const router = useRouter()

  const bookContext = useContext(BookContext)

  const { slug } = router.query

  useEffect(() => {
    getBook(slug, bookContext)
  }, [slug])

  if (bookContext.state.loading)
    return (
      <div className="flex flex-wrap items-center justify-around max-w-4xl sm:w-full">
        Loading ...
      </div>
    )

  if (bookContext.state.error)
    return (
      <div className="flex flex-wrap items-center justify-around max-w-4xl sm:w-full">
        {bookContext.state.error} ...
      </div>
    )

  return (
    <div className="flex flex-col text-left text-lg gap-4">
      {bookContext.state.book && (
        <>
          <div className="w-full text-3xl text-center  mb-2">
            <strong>Book :</strong> {bookContext.state.book.name}
          </div>
          <div className="w-full">
            <strong>ISBN :</strong> {bookContext.state.book.isbn}
          </div>
          <div className="w-full">
            <strong>Publisher :</strong> {bookContext.state.book.publisher}
          </div>
          <div className="w-full">
            <strong>Released :</strong>{" "}
            {formatDate(bookContext.state.book.released)}
          </div>
          <div className="w-full">
            <strong>Number Of Pages :</strong>{" "}
            {bookContext.state.book.numberOfPages}
          </div>
          <div className="w-full">
            {bookContext.state.book.povCharacters &&
              bookContext.state.book.povCharacters.length > 0 && (
                <>
                  <strong className="text-2xl">POV Characters : </strong>
                  <CharacterList
                    charactersUrl={bookContext.state.book.povCharacters}
                  />
                </>
              )}
          </div>
        </>
      )}
    </div>
  )
}

export default BookPage
