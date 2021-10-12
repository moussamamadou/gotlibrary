import axios from "axios"
import { useRouter } from "next/dist/client/router"
import React, { useEffect, useState } from "react"
import CharacterList from "../../components/CharacterList"
import formatDate from "../../lib/formatDate"

interface IBook {
  name: string
  released: string
  publisher: string
  isbn: string
  numberOfPages: number
  povCharacters: Array<String>
}

const BookPage = () => {
  const router = useRouter()

  const { slug } = router.query

  const [book, setBook] = useState<IBook>()
  const [loading, setLoading] = useState<Boolean>(true)
  const [error, setError] = useState<String>("")

  const getBook = () => {
    if (slug)
      axios
        .get(`${process.env.NEXT_PUBLIC_API}/books/${slug}`)
        .then((res) => {
          console.log(res.data)
          let tempBook: IBook = {
            name: res.data.name,
            released: res.data.released,
            publisher: res.data.publisher,
            isbn: res.data.isbn,
            numberOfPages: res.data.numberOfPages,
            povCharacters: res.data.povCharacters,
          }
          setLoading(false)
          setBook(tempBook)
        })
        .catch((error) => {
          setLoading(false)
          setError(`Book Page : ${error.message}`)
        })
  }

  useEffect(() => {
    getBook()
  }, [slug])
  useEffect(() => {
    console.log(book)
  }, [book])

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
      {book && (
        <>
          <div className="w-full">
            <strong>Book Name :</strong> {book.name}
          </div>
          <div className="w-full">
            <strong>ISBN :</strong> {book.isbn}
          </div>
          <div className="w-full">
            <strong>Publisher :</strong> {book.publisher}
          </div>
          <div className="w-full">
            <strong>Released :</strong> {formatDate(book.released)}
          </div>
          <div className="w-full">
            <strong>Number Of Pages :</strong> {book.numberOfPages}
          </div>
          {book.povCharacters && (
            <CharacterList charactersUrl={book.povCharacters} />
          )}
        </>
      )}
    </div>
  )
}

export default BookPage
