const { config } = require('dotenv')

config()

module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-images', 'gatsby-remark-prismjs'],
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-github-releases',
      options: {
        url: process.env.GITHUB_REPO_URL,
      },
    },
  ],
}
