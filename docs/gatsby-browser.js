exports.onClientEntry = () => {
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
  const oneMonthAgoISO = oneMonthAgo.toISOString()

  window.localStorage.setItem('changecast-2c277', oneMonthAgoISO)
  window.localStorage.setItem('changecast-5abce', oneMonthAgoISO)
  window.localStorage.setItem('changecast-da3f9', oneMonthAgoISO)
}
