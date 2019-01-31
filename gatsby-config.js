module.exports = {
  siteMetadata: {
    title: process.env.GITHUB_NAME,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'releases',
        path: `${__dirname}/releases`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-transformer-remark',
    'gatsby-plugin-sharp',
    'gatsby-plugin-offline',
  ],
}
