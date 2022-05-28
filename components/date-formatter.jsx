import { parseISO, format, formatDistance } from 'date-fns'
import id from 'date-fns/locale/id'
// import en from 'date-fns/locale/en-US'

export default function DateFormatter({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'd LLL yyyy', { locale: id })}</time>
}

export function DateFormatterWithHour({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'd MMM yyyy HH:mm:ss', { locale: id })}</time>
}
export function DateFormatterRelative({ dateString }) {
  const date = parseISO(dateString)
  return (
    <time dateTime={dateString}>
      {
    formatDistance(date, new Date(), { locale: id, addSuffix: false })
}
    </time>
  )
}