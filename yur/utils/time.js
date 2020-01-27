export function yearWithMonth (time) {
  const date = time ? new Date(time) : new Date()
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  if (month >= 1 && month <= 9) {
    month = `0${month}`
  }
  return `${month}/${year}`
}

export function getDay (time) {
  const date = time ? new Date(time) : new Date()
  let day = date.getDate()
  if (day >= 1 && day <= 9) {
    day = `0${day}`
  }
  return day
}
