const fs = require('fs-extra')
const axios = require('axios')

async function getStylesheets() {
  fs.mkdirSync('./data/stylesheets')

  // @todo will someone abuse this?
  const { data } = await axios.get(
    process.env.STYLESHEET_URL ||
      'https://raw.githubusercontent.com/markdowncss/splendor/master/css/splendor.css',
    {
      responseType: 'blob',
    }
  )

  fs.writeFileSync('./data/stylesheets/markdown.css', data)
}

getStylesheets()
