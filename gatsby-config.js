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
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-images'],
      },
    },
    // @todo debug caching issues
    // 'gatsby-plugin-offline',
  ],
}
