import axios from "axios"
import _ from "lodash"
import { IBook, IBooksContext } from "../../interfaces/Books"

const getBooks = (
  page: number,
  pageSize: number,
  booksContext: IBooksContext
) => {
  booksContext.dispatch({
    type: "GET_BOOKS_REQUEST",
    payload: { books: [] as Array<IBook>, error: "" },
  })

  axios
    .get(
      `${process.env.NEXT_PUBLIC_API}/books?page=${page}&pageSize=${pageSize}`
    )
    .then((res: any) => {
      let tempBooks: Array<IBook> = []
      res.data.map((book: any) => {
        tempBooks.push({
          url: book.url,
          name: book.name,
          released: book.released,
          publisher: book.publisher,
          isbn: book.isbn,
          numberOfPages: book.numberOfPages,
          povCharacters: book.povCharacters,
        })
      })

      booksContext.dispatch({
        type: "GET_BOOKS_SUCCESS",
        payload: { books: tempBooks, error: "" },
      })
    })
    .catch((error) => {
      booksContext.dispatch({
        type: "GET_BOOKS_FAILURE",
        payload: { books: [] as Array<IBook>, error: error.message },
      })
    })
}
export default getBooks
