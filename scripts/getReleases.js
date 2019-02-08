const fs = require('fs-extra')
const axios = require('axios')
const parseGitUrl = require('git-url-parse')
const { linkify } = require('linkify-markdown')

const { owner, name } = parseGitUrl(process.env.GITHUB_REPO_URL)

function createReleasesPageQuery(after) {
  return `
    query { 
      repository(owner: "${owner}", name: "${name}") {
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
            name
            description
            tag {
              name
            }
          }
          
           }
      }
    } 
  `
}

async function getReleases() {
  fs.mkdirSync('./data/releases')

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
        name,
        description,
        tag: { name: tagName },
      } = nodes[index]

      fs.writeFileSync(
        `./data/releases/${id}.md`,
        `---\ntitle: ${name}\ntagName: ${tagName}\npublishedAt: ${publishedAt}\n---\n\n${linkify(
          description,
          { repository: process.env.GITHUB_REPO_URL }
        )}`
      )
    }

    hasNext = hasNextPage
    after = endCursor
  }
}

getReleases()
