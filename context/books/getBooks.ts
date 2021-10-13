import axios from "axios"
import _ from "lodash"
import { IBook, IBooksContext } from "../../interfaces/Books"
import parse from "parse-link-header"
import { IPagination } from "../../interfaces/Pagination"

const getBooks = (
  page: number,
  pageSize: number,
  booksContext: IBooksContext
) => {
  booksContext.dispatch({
    type: "GET_BOOKS_REQUEST",
    payload: {
      books: [] as Array<IBook>,
      error: "",
      pagination: {} as IPagination,
    },
  })
  const url = `${process.env.NEXT_PUBLIC_API}/books?page=${page}&pageSize=${pageSize}`
  console.log(url)

  axios
    .get(url)
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

      let tempPagination: any
      try {
        tempPagination = parse(res.headers.link)
      } catch (error) {
        console.log("Pïnm", error)
      }

      let pagination: IPagination = {
        first: {
          page: tempPagination.first.page,
          pageSize: tempPagination.first.pageSize,
          rel: tempPagination.first.rel,
          url: tempPagination.first.url,
        },
        last: {
          page: tempPagination.last.page,
          pageSize: tempPagination.last.pageSize,
          rel: tempPagination.last.rel,
          url: tempPagination.last.url,
        },
      }

      if (tempPagination.prev) {
        pagination = {
          ...pagination,
          prev: {
            page: tempPagination.prev.page,
            pageSize: tempPagination.prev.pageSize,
            rel: tempPagination.prev.rel,
            url: tempPagination.prev.url,
          },
        }
      }
      if (tempPagination.next) {
        pagination = {
          ...pagination,
          next: {
            page: tempPagination.next.page,
            pageSize: tempPagination.next.pageSize,
            rel: tempPagination.next.rel,
            url: tempPagination.next.url,
          },
        }
      }

      booksContext.dispatch({
        type: "GET_BOOKS_SUCCESS",
        payload: { books: tempBooks, error: "", pagination: pagination },
      })
    })
    .catch((error) => {
      booksContext.dispatch({
        type: "GET_BOOKS_FAILURE",
        payload: {
          books: [] as Array<IBook>,
          error: "---" + error.message,
          pagination: {} as IPagination,
        },
      })
    })
}
export default getBooks
