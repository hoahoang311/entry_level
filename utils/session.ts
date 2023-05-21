import moment from 'moment'

export const formatDateData = (date: string) => {
  return moment(date).format('DD MMM')
}
