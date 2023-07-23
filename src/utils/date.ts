import moment from 'moment';
export function getRecentDay(n) {
  const day = moment(new Date()).subtract(n, 'days');
  return day;
}
export function getRecentMonth(n) {
  const month = moment(new Date()).subtract(n, 'months');
  return month;
}
export function getRecentDayString(n) {
  const day = moment(new Date()).subtract(n, 'days').format('YYYY-MM-DD');
  return day;
}
export function getRecentMonthString(n) {
  const month = moment(new Date()).subtract(n, 'months').format('YYYY-MM-DD');
  return month;
}
export function getRecentYearMonthString(n) {
  const month = moment(new Date()).subtract(n, 'months').format('YYYY-MM');
  return month;
}

export function formatDateTime(dt, formatStyle) {
  return moment(dt).format(formatStyle);
}
