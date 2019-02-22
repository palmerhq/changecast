const { getColorFromURL, getPaletteFromURL } = require('color-thief-node')

async function onCreateNode({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) {
  const { createNode, createNodeField } = actions

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

exports.onCreateNode = onCreateNode
