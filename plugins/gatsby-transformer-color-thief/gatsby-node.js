const { getColorFromURL, getPaletteFromURL } = require('color-thief-node')
const luminance = require('relative-luminance')

exports.onCreateNode = async ({
  node,
  actions: { createNode, createNodeField },
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

  const dominantColor = await getColorFromURL(node.relativePath)
  const colorPalette = await getPaletteFromURL(node.relativePath)
  const sortedColorPalette = colorPalette.sort(
    (colorA, colorB) => luminance(colorA) - luminance(colorB)
  )

  createNodeField({ node, name: 'dominantColor', value: dominantColor })
  createNodeField({ node, name: 'colorPalette', value: sortedColorPalette })
}
