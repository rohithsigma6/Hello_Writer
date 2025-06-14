import moment from "moment";

export default function formatDate(date: Date | string) {
  if (!date) {
    return `Invalid Date`;
  }

  return moment(date).format("MMM DD, YYYY");
}
