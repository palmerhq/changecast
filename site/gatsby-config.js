const path = require('path')
const hexRgb = require('hex-rgb')
const { config } = require('dotenv')

config({ path: path.resolve('..', '.env') })

module.exports = {
  siteMetadata: {
    overrideColor: process.env.PRIMARY_COLOR
      ? hexRgb(process.env.PRIMARY_COLOR, { format: 'array' })
      : false,
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
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
