workflow "Build and Publish ChangeCast" {
  on = "release"
  resolves = [
    "Alias Now Deployment",
    "Publish with Netlify",
  ]
}

action "Build" {
  uses = "palmerhq/changecast@v1.0.0"
  secrets = ["GITHUB_TOKEN"]
}

action "Publish with Netlify" {
  needs = "Build"
  uses = "netlify/actions/cli@master"
  args = "deploy --dir=./changecast --site=061cc43b-d700-492c-9e3d-3d92f6d197aa --prod"
  secrets = [
    "NETLIFY_AUTH_TOKEN",
  ]
}

action "Publish with Now" {
  uses = "actions/zeit-now@1.0.0"
  needs = ["Build"]
  args = "--public --no-clipboard --scope=palmer deploy ./changecast > $HOME/$GITHUB_ACTION.txt"
  secrets = ["ZEIT_TOKEN"]
}

action "Alias Now Deployment" {
  needs = ["Publish with Now"]
  uses = "actions/zeit-now@1.0.0"
  args = "alias `cat /github/home/deploy.txt` changecast-log"
  secrets = [
    "ZEIT_TOKEN",
  ]
}

workflow "PR to release notes" {
  on = "pull_request"
  resolves = ["Chronicler"]
}

action "Chronicler" {
  uses = "crosscompile/chronicler-action@v1.0.1"
  secrets = ["GITHUB_TOKEN"]
}
