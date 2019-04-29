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
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-transformer-og-image',
      options: {
        fontPath: '../fonts/Inter-SemiBold.woff',
        fontColor: '#24292e',
        backgroundColor: '#f7f7f7',
      },
    },
    'gatsby-transformer-favicons',
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/styles/typography`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-139165006-1',
      },
    },
  ],
}
