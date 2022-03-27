// making global filter. creating function which takes in Value
export default (value) => {
  // format it back to date
  const date = new Date(value)
  return date.toLocaleString(['en-US'], {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}
