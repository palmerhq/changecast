const path = require('path')
const { config } = require('dotenv')

config({ path: path.resolve('..', '.env') })

module.exports = {
  siteMetadata: {
    exampleSiteUrls: [
      process.env.FIRST_EXAMPLE_URL,
      process.env.SECOND_EXAMPLE_URL,
      process.env.THIRD_EXAMPLE_URL,
    ],
  },
  plugins: ['gatsby-plugin-emotion', 'gatsby-plugin-react-helmet'],
}
