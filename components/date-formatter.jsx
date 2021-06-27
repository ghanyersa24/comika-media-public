import { parseISO, format, registerLocale } from 'date-fns'
import id from 'date-fns/locale/id'

export default function DateFormatter({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'd LLLL yyyy', { locale: id })}</time>
}
