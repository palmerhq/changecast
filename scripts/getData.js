const fs = require('fs-extra')
const { config } = require('dotenv')
const { exec } = require('child_process')

config()

fs.removeSync('./data')
fs.mkdirSync('./data')

function logOutput(error, stdout, stderr) {
  if (error) {
    console.log(error)
  }

  if (stdout) {
    console.log(stdout)
  }

  if (stderr) {
    console.log(stderr)
  }
}

exec(
  'node ./scripts/getReleases.js',
  {
    env: process.env,
  },
  logOutput
)

exec(
  'node ./scripts/getRepository.js',
  {
    env: process.env,
  },
  logOutput
)

exec(
  'node ./scripts/getStylesheets.js',
  {
    env: process.env,
  },
  logOutput
)
