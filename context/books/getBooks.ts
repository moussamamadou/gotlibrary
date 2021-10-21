import axios from "axios"
import _ from "lodash"
import { IBook, IBooksContext } from "../../interfaces/Books"
import parse from "parse-link-header"
import { IPagination } from "../../interfaces/Pagination"
import { booksError, booksLoaded, booksRequested } from "./actions"

const getBooks = (
  page: number,
  pageSize: number,
  booksContext: IBooksContext
) => {
  booksContext.dispatch(booksRequested())
  const url = `${process.env.NEXT_PUBLIC_API}/books?page=${page}&pageSize=${pageSize}`
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
      tempPagination = parse(res.headers.link)

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

      booksContext.dispatch(booksLoaded(tempBooks, pagination))
    })
    .catch((error) => {
      booksContext.dispatch(booksError(error.message))
    })
}
export default getBooks
