import moment from "moment"

const formatDate = (date: string) => {
  return moment(date).format("Do MMMM YYYY")
}

export default formatDate
