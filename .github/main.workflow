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

workflow "Run Chronicler" {
  on = "pull_request"
  resolves = ["Chronicler"]
}

action "Chronicler" {
  uses = "crosscompile/chronicler-action@v1.0.1"
  secrets = ["GITHUB_TOKEN"]
}

workflow "Build and Publish Docs" {
  resolves = [
    "Alias Material UI",
    "Alias Workbox",
    "Alias React Beautiful Dnd",
    "Alias Docs",
  ]
  on = "pull_request"
}

action "React Beautiful DnD Changecast" {
  uses = "./"
  secrets = ["GITHUB_TOKEN"]
  env = {
    REPO_URL = "https://github.com/atlassian/react-beautiful-dnd"
  }
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
  uses = "./"
  args = "GITHUB_REPO_URL="
  secrets = ["GITHUB_TOKEN"]
  env = {
    REPO_URL = "https://github.com/mui-org/material-ui"
  }
}

action "Publish Material UI" {
  uses = "actions/zeit-now@1.0.0"
  needs = ["Material UI Changecast"]
  secrets = ["ZEIT_TOKEN"]
  args = "--public --no-clipboard --scope=palmer deploy ./changecast > $GITHUB_WORKSPACE/deploy.txt"
}

action "Alias Material UI" {
  uses = "actions/zeit-now@1.0.0"
  needs = ["Publish Material UI"]
  args = "alias `cat $GITHUB_WORKSPACE/deploy.txt` changecast-2-$GITHUB_SHA"
  secrets = ["ZEIT_TOKEN"]
}

action "Workbox Changecast" {
  uses = "./"
  secrets = ["GITHUB_TOKEN"]
  env = {
    REPO_URL = "https://github.com/GoogleChrome/workbox"
  }
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

action "Install Docs" {
  uses = "nuxt/actions-yarn@master"
  args = "install"
}

action "Build Docs" {
  uses = "nuxt/actions-yarn@master"
  args = "build --cwd \"./docs\""
  needs = ["Install Docs"]
  env = {
    FIRST_EXAMPLE_URL = "https://changecast-1-$GITHUB_SHA.now.sh"
    SECOND_EXAMPLE_URL = "https://changecast-2-$GITHUB_SHA.now.sh"
    THIRD_EXAMPLE_URL = "https://changecast-3-$GITHUB_SHA.now.sh"
  }
}

action "Publish Docs" {
  uses = "actions/zeit-now@1.0.0"
  args = "--public --no-clipboard --scope=palmer deploy ./changecast > $GITHUB_WORKSPACE/deploy.txt"
  secrets = ["ZEIT_TOKEN"]
  needs = ["Build Docs"]
}

action "Alias Docs" {
  uses = "actions/zeit-now@5c51b26db987d15a0133e4c760924896b4f1512f"
  needs = ["Publish Docs"]
  secrets = ["ZEIT_TOKEN"]
  args = "alias `cat $GITHUB_WORKSPACE/deploy.txt` changecast-$GITHUB_SHA"
}
