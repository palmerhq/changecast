const path = require('path')
const { graphql } = require('gatsby/graphql')

exports.createPages = ({ graphql, actions }) => {
  return new Promise((resolve, reject) => {
    const releaseTemplate = path.resolve('./src/templates/ReleaseTemplate.js')

    const releaseQuery = `
      {
        releases: allGithubRelease {
          edges {
            node {
              tagName
            }
          }
        }
      }
    `

    resolve(
      graphql(releaseQuery).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        result.data.releases.edges.forEach(({ node: { tagName } }) => {
          actions.createPage({
            path: `/${tagName}`,
            component: releaseTemplate,
            context: {
              tagName,
            },
          })
        })
      })
    )
  })
}
