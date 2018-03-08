const formatNumberDigits = (number, digits) =>
  ('0000000' + number).slice(-digits)

export const formatTimer = value => {
  const date = new Date(value)
  const minutes = formatNumberDigits(date.getMinutes(), 2)
  const seconds = formatNumberDigits(date.getSeconds(), 2)
  const miliseconds = formatNumberDigits(date.getMilliseconds(), 2)
  return `${minutes}:${seconds}.${miliseconds}`
}
