import { format } from 'date-fns'

export default function formatDate(
  unixDateTime: number,
  formatString?: string
) {
  return format(new Date(unixDateTime * 1000), formatString ?? 'yyyy년MM월dd일')
}
