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
  args = "BASE_URL=https://changecast-log.now.sh"
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
  args = "--public --no-clipboard --scope=palmer deploy ./changecast > $GITHUB_WORKSPACE/deploy.txt"
  secrets = ["ZEIT_TOKEN"]
}

action "Alias Now Deployment" {
  needs = ["Publish with Now"]
  uses = "actions/zeit-now@1.0.0"
  args = "alias `cat $GITHUB_WORKSPACE/deploy.txt` changecast-log"
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

workflow "Build Docs" {
  on = "pull_request"
  resolves = [
    "React Beautiful DnD Changecast",
    "Alias Material UI",
    "Alias Workbox Master",
    "Alias Workbox",
    "Alias React Beautiful Dnd",
    "Alias React Beautiful DnD Master",
    "Alias Material UI Master",
  ]
}

action "React Beautiful DnD Changecast" {
  uses = "palmerhq/changecast@master"
  secrets = ["GITHUB_TOKEN"]
  args = "GITHUB_REPO_URL=https://github.com/mui-org/material-ui"
}

action "Publish React Beautiful DnD" {
  uses = "actions/zeit-now@1.0.0"
  args = "--public --no-clipboard --scope=palmer deploy ./changecast > $GITHUB_WORKSPACE/deploy.txt"
  secrets = ["ZEIT_TOKEN"]
  needs = ["React Beautiful DnD Changecast"]
}

action "Alias React Beautiful Dnd" {
  uses = "actions/zeit-now@1.0.0"
  args = "alias `cat $GITHUB_WORKSPACE/deploy.txt` changecast-1-$GITHUB_SHA"
  secrets = ["ZEIT_TOKEN"]
  needs = ["Publish React Beautiful DnD"]
}

action "Material UI Changecast" {
  uses = "palmerhq/changecast@master"
  args = "GITHUB_REPO_URL=https://github.com/mui-org/material-ui"
  secrets = ["GITHUB_TOKEN"]
}

action "Publish Material UI" {
  uses = "actions/zeit-now@1.0.0"
  needs = ["Material UI Changecast"]
  secrets = ["ZEIT_TOKEN"]
  args = "--public --no-clipboard --scope=palmer deploy ./changecast > $GITHUB_WORKSPACE/deploy.txt"
}

action "Alias Material UI" {
  uses = "actions/zeit-now@5c51b26db987d15a0133e4c760924896b4f1512f"
  needs = ["Publish Material UI"]
  args = "alias `cat $GITHUB_WORKSPACE/deploy.txt` changecast-2-$GITHUB_SHA"
  secrets = ["ZEIT_TOKEN"]
}

action "Workbox Changecast" {
  uses = "palmerhq/changecast@master"
  args = "GITHUB_REPO_URL=https://github.com/GoogleChrome/workbox"
  secrets = ["GITHUB_TOKEN"]
}

action "Publish Workbox" {
  uses = "actions/zeit-now@1.0.0"
  needs = ["Workbox Changecast"]
  args = "--public --no-clipboard --scope=palmer deploy ./changecast > $GITHUB_WORKSPACE/deploy.txt"
  secrets = ["ZEIT_TOKEN"]
}

action "Alias Workbox" {
  uses = "actions/zeit-now@1.0.0"
  needs = ["Publish Workbox"]
  secrets = ["ZEIT_TOKEN"]
  args = "alias `cat $GITHUB_WORKSPACE/deploy.txt` changecast-3-$GITHUB_SHA"
}

action "Filter master" {
  uses = "actions/bin/filter@master"
  needs = ["Publish Workbox"]
  args = "branch master"
}

action "Alias Workbox Master" {
  uses = "actions/zeit-now@1.0.0"
  needs = ["Filter master"]
  args = "alias `cat $GITHUB_WORKSPACE/deploy.txt` changecast-3"
  secrets = ["ZEIT_TOKEN"]
}

action "actions/bin/filter@master" {
  uses = "actions/bin/filter@master"
  needs = ["Publish React Beautiful DnD"]
  args = "branch master"
}

action "Alias React Beautiful DnD Master" {
  uses = "actions/zeit-now@1.0.0"
  needs = ["actions/bin/filter@master"]
  args = "alias `cat $GITHUB_WORKSPACE/deploy.txt` changecast-1"
  secrets = ["ZEIT_TOKEN"]
}

action "actions/bin/filter@master-1" {
  uses = "actions/bin/filter@master"
  needs = ["Publish Material UI"]
  args = "branch master"
}

action "Alias Material UI Master" {
  uses = "actions/zeit-now@1.0.0"
  needs = ["actions/bin/filter@master-1"]
  args = "alias `cat $GITHUB_WORKSPACE/deploy.txt` changecast-2"
  secrets = ["ZEIT_TOKEN"]
}
