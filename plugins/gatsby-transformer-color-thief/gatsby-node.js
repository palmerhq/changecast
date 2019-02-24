const { getColorFromURL, getPaletteFromURL } = require('color-thief-node')

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

  createNodeField({ node, name: 'dominantColor', value: dominantColor })
  createNodeField({ node, name: 'colorPalette', value: colorPalette })
}
