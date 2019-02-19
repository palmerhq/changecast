const path = require('path')
const fs = require('fs')
const { graphql } = require('gatsby/graphql')

let releaseEdges

exports.createPages = ({ graphql, actions }) => {
  return new Promise((resolve, reject) => {
    const releaseTemplate = path.resolve('./src/templates/ReleaseTemplate.js')

    const query = `
      {
        releases: allGithubRelease(filter: { draft: { eq: false } }) {
          edges {
            node {
              tagName
              publishedAt
            }
          }
        }
      }
    `

    resolve(
      graphql(query).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        releaseEdges = result.data.releases.edges

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

exports.onPostBuild = () =>
  fs.writeFileSync(
    path.resolve(process.cwd(), 'public', 'dates.json'),
    JSON.stringify(
      releaseEdges.slice(0, 10).map(({ node: { publishedAt } }) => publishedAt)
    )
  )
