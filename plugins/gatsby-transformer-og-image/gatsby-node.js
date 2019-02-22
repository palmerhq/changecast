const fs = require('fs-extra')
const path = require('path')
const sharp = require('sharp')
const svg2img = require('svg2img')
const { loadSync } = require('text-to-svg')
const { createFileNode } = require('gatsby-source-filesystem')
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} = require(`gatsby/graphql`)
const crypto = require(`crypto`)

async function onCreateNode({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) {
  const { createNode, createNodeField, createParentChildLink } = actions

  if (
    node.internal.mediaType !== 'image/png' &&
    node.internal.mediaType !== 'image/jpeg'
  ) {
    return
  }

  const ogImageNode = {
    id: createNodeId(`${node.id} >> OGImage`),
    children: [],
    parent: node.id,
    internal: {
      contentDigest: `${node.internal.contentDigest}`,
      type: `OGImage`,
    },
  }

  createNode(ogImageNode)
  createParentChildLink({ parent: node, child: ogImageNode })
}

function createTextSvg(text) {
  return new Promise((resolve, reject) => {
    svg2img(
      loadSync().getSVG(text, {
        x: 0,
        y: 0,
        fontSize: 150,
        fontWeight: 'bold',
        anchor: 'top',
        attributes: {
          fill: 'black',
          stroke: 'black',
        },
      }),
      function(error, buffer) {
        if (error) {
          reject(error)
        } else {
          resolve(buffer)
        }
      }
    )
  })
}

// mostly copied from https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-sharp/src/index.js#L374
// @todo queue these rather than running directly
async function setFieldsOnGraphQLNodeType({
  type,
  pathPrefix,
  getNodeAndSavePathDependency,
  reporter,
  cache,
}) {
  if (type.name !== `OGImage`) {
    return {}
  }

  return {
    ogImageWithText: {
      type: new GraphQLObjectType({
        name: 'OGImageWithText',
        fields: {
          src: { type: GraphQLString },
        },
      }),
      args: {
        text: {
          type: GraphQLString,
        },
      },
      async resolve(image, fieldArgs, context) {
        const file = getNodeAndSavePathDependency(image.parent, context.path)

        const argsDigest = crypto
          .createHash(`md5`)
          .update(JSON.stringify(fieldArgs))
          .digest(`hex`)

        const argsDigestShort = argsDigest.substr(argsDigest.length - 5)

        const imgSrc = `/${file.name}.${file.extension}`
        const dirPath = path.join(
          process.cwd(),
          `public`,
          `static`,
          file.internal.contentDigest,
          argsDigestShort
        )

        const filePath = path.join(dirPath, imgSrc)
        fs.ensureDirSync(dirPath)

        const avatar = fs.readFileSync(file.relativePath)
        const text = await createTextSvg(fieldArgs.text)

        const logoAndText = await sharp(avatar)
          .flatten({ background: { r: 255, g: 255, b: 255, alpha: 1 } })
          .extend({
            top: 0,
            bottom: 170,
            left: 924,
            right: 924,
            background: { r: 255, g: 255, b: 255, alpha: 1 },
          })
          .overlayWith(text, { gravity: 'south' })
          .toBuffer()

        sharp(logoAndText)
          .extend({
            top: 400,
            bottom: 400,
            left: 0,
            right: 0,
            background: { r: 255, g: 255, b: 255, alpha: 1 },
          })
          .toFile(filePath)

        const encodedImgSrc = `/${encodeURIComponent(file.name)}.${
          file.extension
        }`

        const digestDirPrefix = `${
          file.internal.contentDigest
        }/${argsDigestShort}`
        const prefixedSrc = `/static/${digestDirPrefix}${encodedImgSrc}`

        return Promise.resolve({
          src: prefixedSrc,
        })
      },
    },
  }
}

exports.onCreateNode = onCreateNode
exports.setFieldsOnGraphQLNodeType = setFieldsOnGraphQLNodeType
