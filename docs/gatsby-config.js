const path = require('path')
const mdPlugins = [require('remark-unwrap-images')]
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
        fontPath: '../fonts/Inter-UI-SemiBold.woff',
        fontColor: '#24292e',
        backgroundColor: '#f7f7f7',
      },
    },
    'gatsby-transformer-favicons',
    // {
    //   resolve: `gatsby-plugin-typography`,
    //   options: {
    //     pathToConfigModule: `src/styles/typography`,
    //   },
    // },
    // {
    //   resolve: 'gatsby-plugin-compile-es6-packages',
    //   options: {
    //     modules: ['mdx-blocks'],
    //   },
    // },
    {
      resolve: 'gatsby-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        mdPlugins,
      },
    },
  ],
}
