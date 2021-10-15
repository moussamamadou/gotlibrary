import axios from "axios"
import _ from "lodash"
import { IBook, IBookContext } from "../../interfaces/Books"
import { bookError, bookLoaded } from "./actions"

const getBook = (
  slug: string | string[] | undefined,
  bookContext: IBookContext
) => {
  if (slug) {
    if (_.isString(slug)) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API}/books/${slug}`)
        .then((res: any) => {
          let tempBook: IBook = {
            url: res.data.url,
            name: res.data.name,
            released: res.data.released,
            publisher: res.data.publisher,
            isbn: res.data.isbn,
            numberOfPages: res.data.numberOfPages,
            povCharacters: res.data.povCharacters,
          }
          bookContext.dispatch(bookLoaded(tempBook))
        })
        .catch((error) => {
          bookContext.dispatch(bookError(error.message))
        })
    } else {
      bookContext.dispatch(bookError("This Book Does not exist"))
    }
  }
}
export default getBook
