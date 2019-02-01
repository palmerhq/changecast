const fs = require('fs-extra')
const axios = require('axios')
const { config } = require('dotenv')

config()

function createReleasesPageQuery(after) {
  return `
    query { 
      repository(owner: "${process.env.GITHUB_REPO_OWNER}", name: "${
    process.env.GITHUB_REPO_NAME
  }") {
        name
        releases(first: 5, orderBy: { field: CREATED_AT, direction: DESC }${
          after ? `, after: "${after}"` : ''
        }) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            publishedAt
            tag {
              name
            }
            description
          }
          
           }
      }
    } 
  `
}

async function getReleases() {
  fs.removeSync('./releases')
  fs.mkdirSync('./releases')

  let hasNext = true
  let after

  while (hasNext) {
    const {
      data: {
        data: {
          repository: {
            releases: {
              pageInfo: { hasNextPage, endCursor },
              nodes,
            },
          },
        },
      },
    } = await axios.post(
      'https://api.github.com/graphql',
      { query: createReleasesPageQuery(after) },
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
        },
      }
    )

    for (let index = 0; index < nodes.length; index++) {
      const {
        id,
        publishedAt,
        tag: { name },
        description,
      } = nodes[index]

      fs.writeFileSync(
        `./releases/${id}.md`,
        `---\ntagName: ${name}\npublishedAt: ${publishedAt}\n---\n\n${description}`
      )
    }

    hasNext = hasNextPage
    after = endCursor
  }
}

getReleases()
