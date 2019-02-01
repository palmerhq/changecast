const fs = require('fs-extra')
const axios = require('axios')
const { config } = require('dotenv')

config()

async function getStylesheets() {
  fs.removeSync('./stylesheets')
  fs.mkdirSync('./stylesheets')

  // @todo will someone abuse this?
  const { data } = await axios.get(
    process.env.STYLESHEET_URL ||
      'https://raw.githubusercontent.com/markdowncss/splendor/master/css/splendor.css',
    {
      responseType: 'blob',
    }
  )

  fs.writeFileSync('./stylesheets/markdown.css', data)
}

getStylesheets()
