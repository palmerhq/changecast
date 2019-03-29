const path = require('path')
const hexRgb = require('hex-rgb')
const { config } = require('dotenv')

config({ path: path.resolve('..', '.env') })

module.exports = {
  siteMetadata: generateMetadata(),
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/styles/typography`,
      },
    },
    {
      resolve: 'gatsby-source-github-releases',
      options: {
        url: process.env.GITHUB_REPO_URL,
        token: process.env.GITHUB_ACCESS_TOKEN,
      },
    },
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    'gatsby-transformer-color-thief',
    {
      resolve: 'gatsby-transformer-og-image',
      options: {
        fontPath: '../fonts/Inter-UI-SemiBold.woff',
        fontColor: '#24292e',
        backgroundColor: '#f7f7f7',
      },
    },
    'gatsby-transformer-favicons',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          { resolve: 'gatsby-remark-images', options: { maxWidth: 800 } },
          'gatsby-remark-prismjs',
          'gatsby-remark-external-links',
          'gatsby-remark-gemoji-to-emoji',
          'gatsby-transformer-remark-plaintext',
        ],
      },
    },
  ],
}

function generateMetadata() {
  // default to false for each since undefined fields cannot be queried
  return {
    title: process.env.TITLE || false,
    primaryColor: process.env.PRIMARY_COLOR
      ? hexRgb(process.env.PRIMARY_COLOR, { format: 'array' })
      : false,
    url: process.env.URL || '',
  }
}
