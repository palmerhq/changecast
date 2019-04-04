const path = require('path')

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const indexTemplate = path.resolve('./src/templates/IndexTemplate.js')
  const ogText = 'ChangeCast'

  createPage({
    path: `/`,
    component: indexTemplate,
    context: {
      ogText,
    },
  })
}
