const { config } = require('dotenv')

config()

module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-images', 'gatsby-remark-prismjs'],
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-source-github-releases',
      options: {
        url: process.env.GITHUB_REPO_URL,
        token: process.env.GITHUB_ACCESS_TOKEN,
      },
    },
  ],
}
