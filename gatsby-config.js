const path = require('path')
const hexRgb = require('hex-rgb')
const { config } = require('dotenv')

config()

module.exports = {
  siteMetadata: generateMetadata(),
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    'gatsby-transformer-color-thief',
    'gatsby-transformer-og-image',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          { resolve: 'gatsby-remark-images', options: { maxWidth: 800 } },
          'gatsby-remark-prismjs',
          'gatsby-remark-external-links',
        ],
      },
    },
    {
      resolve: 'gatsby-source-github-releases',
      options: {
        url: process.env.GITHUB_REPO_URL,
        token: process.env.GITHUB_ACCESS_TOKEN,
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
    url:
      process.env.URL ||
      process.env.NOW_URL ||
      (process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000'
        : 'http://localhost:9000'),
  }
}
