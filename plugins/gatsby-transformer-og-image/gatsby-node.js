const fs = require('fs-extra')
const path = require('path')
const sharp = require('sharp')
const svg2img = require('svg2img')
const { loadSync } = require('text-to-svg')
const { createFileNode } = require('gatsby-source-filesystem')
const { GraphQLObjectType, GraphQLString } = require(`gatsby/graphql`)
const crypto = require(`crypto`)

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

// file system related code coped from: https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-sharp/src/index.js#L374
exports.setFieldsOnGraphQLNodeType = async (
  { type, pathPrefix, getNodeAndSavePathDependency, reporter, cache },
  { fontPath, fontColor, backgroundColor }
) => {
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

        const outputPath = path.join(dirPath, imgSrc)
        fs.ensureDirSync(dirPath)

        await generateOgImage(
          file,
          fieldArgs.text,
          outputPath,
          fontPath,
          fontColor,
          backgroundColor
        )

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

async function generateOgImage(
  file,
  text,
  outputPath,
  fontPath,
  fontColor,
  backgroundColor
) {
  const image = fs.readFileSync(file.absolutePath)

  const svg = generateTextSvg(text, fontPath, fontColor)
  const width = getSvgWidth(svg)
  const height = getSvgHeight(svg)
  let textImage = await generateImageBuffer(svg)

  if (width > 1700) {
    textImage = await sharp(textImage)
      .resize({ width: 1700, height, fit: 'contain' })
      .toBuffer()
  }

  const resizedImage = await sharp(image)
    .resize({ height: 400 })
    .flatten({ background: backgroundColor })
    .toBuffer()

  const addText = await sharp(resizedImage)
    .extend({
      top: 0,
      bottom: 270,
      left: 824,
      right: 824,
      background: backgroundColor,
    })
    .overlayWith(textImage, { gravity: 'south' })
    .toBuffer()

  sharp(addText)
    .extend({
      top: 230,
      bottom: 270,
      left: 0,
      right: 0,
      background: backgroundColor,
    })
    .toFile(outputPath)
}

function generateTextSvg(text, fontPath, fontColor) {
  return loadSync(fontPath).getSVG(text, {
    x: 0,
    y: 0,
    fontSize: 150,
    anchor: 'top',
    attributes: {
      fill: fontColor,
      stroke: fontColor,
    },
  })
}

function getSvgWidth(svg) {
  return parseFloat(svg.match(/width="([^"]*)"/)[1])
}

function getSvgHeight(svg) {
  return parseFloat(svg.match(/height="([^"]*)"/)[1])
}

function generateImageBuffer(svg, fontPath) {
  return new Promise((resolve, reject) => {
    svg2img(svg, function(error, buffer) {
      if (error) {
        reject(error)
      } else {
        resolve(buffer)
      }
    })
  })
}
