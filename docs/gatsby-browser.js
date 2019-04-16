exports.onClientEntry = () => {
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
  const oneMonthAgoISO = oneMonthAgo.toISOString()

  window.localStorage.setItem('changecast-077d7', oneMonthAgoISO)
  window.localStorage.setItem('changecast-2c277', oneMonthAgoISO)
  window.localStorage.setItem('changecast-ff975', oneMonthAgoISO)
}
