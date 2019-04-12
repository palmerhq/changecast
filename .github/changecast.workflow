workflow "Build and Publish ChangeCast" {
  on = "release"
  resolves = [
    "Publish with Now",
    "Publish with Netlify",
  ]
}

action "Build" {
  uses = "palmerhq/changecast@master"
  secrets = ["GITHUB_TOKEN"]
}

action "Publish with Netlify" {
  needs = "Build"
  uses = "netlify/actions/cli@master"
  args = "deploy --dir=./changecast --prod"
  secrets = [
    "NETLIFY_AUTH_TOKEN",
    "NETLIFY_SITE_ID",
  ]
}

action "Publish with Now" {
  uses = "actions/zeit-now@1.0.0"
  needs = ["Build"]
  args = "./changecast --public"
  secrets = ["ZEIT_TOKEN"]
}
