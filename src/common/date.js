import dayjs from 'dayjs'

export const formatDate = date => {
  return dayjs(date).format('MMM YYYY')
}

export const parseDate = date => {
  return dayjs(date, 'MMM YYYY').toString()
}
