export interface IPagination {
  next?: {
    page: string
    pageSize: string
    rel: string
    url: string
  }
  prev?: {
    page: string
    pageSize: string
    rel: string
    url: string
  }
  first: {
    page: string
    pageSize: string
    rel: string
    url: string
  }
  last: {
    page: string
    pageSize: string
    rel: string
    url: string
  }
}
