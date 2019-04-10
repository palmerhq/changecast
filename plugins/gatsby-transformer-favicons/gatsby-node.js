const fs = require('fs-extra')
const path = require('path')
const { createFileNode } = require('gatsby-source-filesystem')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLJSON,
} = require(`gatsby/graphql`)
const crypto = require(`crypto`)
const favicons = require('favicons')
const parse = require('html-react-parser')

const defaultOptions = {
  logo: './src/favicon.png',
  emitStats: true,
  statsFilename: '.iconstats.json',
  persistentCache: true,
  inject: false,

  appName: null,
  appDescription: null,
  developerName: null,
  developerURL: null,
  dir: 'auto',
  lang: 'en-US',
  background: '#fff',
  theme_color: '#fff',
  display: 'standalone',
  orientation: 'any',
  start_url: '/?homescreen=1',
  version: '1.0',

  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: false,
    favicons: true,
    firefox: true,
    opengraph: false,
    twitter: false,
    yandex: false,
    windows: false,
  },
}

exports.onCreateNode = async ({
  node,
  actions: { createNode, createNodeField, createParentChildLink },
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) => {
  if (
    node.internal.mediaType !== 'image/png' &&
    node.internal.mediaType !== 'image/jpeg'
  ) {
    return
  }

  const faviconsNode = {
    id: createNodeId(`${node.id} >> Favicon`),
    children: [],
    parent: node.id,
    internal: {
      contentDigest: `${node.internal.contentDigest}`,
      type: `Favicon`,
    },
  }

  createNode(faviconsNode)
  createParentChildLink({ parent: node, child: faviconsNode })
}

const FaviconElement = new GraphQLObjectType({
  name: 'FaviconElement',
  fields: {
    props: { type: GraphQLJSON },
    type: { type: GraphQLString },
  },
})

// file system related code coped from: https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-sharp/src/index.js#L374
exports.setFieldsOnGraphQLNodeType = async ({
  type,
  pathPrefix,
  getNodeAndSavePathDependency,
  reporter,
  cache,
}) => {
  if (type.name !== `Favicon`) {
    return {}
  }

  return {
    faviconElements: {
      type: GraphQLList(FaviconElement),
      args: {},
      async resolve(image, fieldArgs, context) {
        const file = getNodeAndSavePathDependency(image.parent, context.path)

        const argsDigest = crypto
          .createHash(`md5`)
          .update(JSON.stringify(fieldArgs))
          .digest(`hex`)

        const argsDigestShort = argsDigest.substr(argsDigest.length - 5)

        const faviconsPath = `/static/${
          file.internal.contentDigest
        }/${argsDigestShort}`

        const { html, images } = await generateFavicons(file.absolutePath, {
          path: faviconsPath,
        })

        const dirPath = path.join(
          process.cwd(),
          `public`,
          `static`,
          file.internal.contentDigest,
          argsDigestShort
        )
        fs.ensureDirSync(dirPath)

        images.forEach(image => {
          fs.writeFileSync(path.join(dirPath, image.name), image.contents, {
            encoding: 'binary',
          })
        })

        const faviconElements = html.map(element => {
          const { props, type } = parse(element)
          return { props, type }
        })

        return Promise.resolve(faviconElements)
      },
    },
  }
}

function generateFavicons(filePath, options) {
  return new Promise((resolve, reject) => {
    favicons(filePath, { ...defaultOptions, ...options }, (error, response) => {
      if (error) {
        reject(error.message)
      }

      resolve(response)
    })
  })
}
