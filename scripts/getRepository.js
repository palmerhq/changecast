const fs = require('fs-extra')
const axios = require('axios')
const parseGitUrl = require('git-url-parse')

async function getRepository() {
  const { owner, name } = parseGitUrl(process.env.GITHUB_REPO_URL)

  const {
    data: {
      data: { repository },
    },
  } = await axios.post(
    'https://api.github.com/graphql',
    {
      query: `
        query { 
          repository(owner: "${owner}", name: "${name}") {
            name
            url
            owner {
              login
              avatarUrl
            }
            description
            homepageUrl
          }
        }
      `,
    },
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    }
  )

  fs.writeFileSync('./data/repository.json', JSON.stringify(repository))
}

getRepository()
