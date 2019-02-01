const fs = require('fs-extra')
const axios = require('axios')

async function getRepository() {
  const {
    data: {
      data: {
        repository: { name, description },
      },
    },
  } = await axios.post(
    'https://api.github.com/graphql',
    {
      query: `
        query { 
          repository(owner: "${process.env.GITHUB_REPO_OWNER}", name: "${
        process.env.GITHUB_REPO_NAME
      }") {
            name
            description
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

  fs.writeFileSync(
    './data/repository.json',
    JSON.stringify({ name, description })
  )
}

getRepository()
