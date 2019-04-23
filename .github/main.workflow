workflow "Build and Deploy ChangeCast" {
  resolves = [
    "Alias Now Deployment",
    "Deploy with Netlify",
  ]
  on = "release"
}

action "Build" {
  uses = "palmerhq/changecast@v1.0.0"
  secrets = ["GITHUB_TOKEN"]
  env = {
    BASE_URL = "https://changecast-log.now.sh"
  }
}

action "Deploy with Netlify" {
  needs = "Build"
  uses = "netlify/actions/cli@master"
  args = "deploy --dir=./changecast --site=061cc43b-d700-492c-9e3d-3d92f6d197aa --prod"
  secrets = [
    "NETLIFY_AUTH_TOKEN",
  ]
}

action "Deploy with Now" {
  uses = "actions/zeit-now@1.0.0"
  needs = ["Build"]
  args = "--public --no-clipboard --scope=palmer deploy ./changecast > $GITHUB_WORKSPACE/deploy.txt"
  secrets = ["ZEIT_TOKEN"]
}

action "Alias Now Deployment" {
  uses = "actions/zeit-now@1.0.0"
  args = "alias `cat $GITHUB_WORKSPACE/deploy.txt` changecast-log"
  secrets = [
    "ZEIT_TOKEN",
  ]
  needs = ["Deploy with Now"]
}

workflow "Run Chronicler" {
  on = "pull_request"
  resolves = ["Chronicler"]
}

action "Chronicler" {
  uses = "crosscompile/chronicler-action@v1.0.1"
  secrets = ["GITHUB_TOKEN"]
}

workflow "Build and Deploy Docs Preview" {
  resolves = [
    "Alias Material UI Preview",
    "Alias React Beautiful DnD Preview",
    "Alias Workbox Preview",
    "Alias Docs Preview",
  ]
  on = "pull_request"
}

action "Build React Beautiful DnD ChangeCast Preview" {
  uses = "./"
  secrets = ["GITHUB_TOKEN"]
  env = {
    REPO_URL = "https://github.com/atlassian/react-beautiful-dnd"
  }
}

action "Deploy React Beautiful DnD Preview" {
  uses = "actions/zeit-now@1.0.0"
  args = "--public --no-clipboard --scope=palmer deploy ./changecast > $GITHUB_WORKSPACE/deploy.txt"
  secrets = ["ZEIT_TOKEN"]
  needs = ["Build React Beautiful DnD ChangeCast Preview"]
}

action "Alias React Beautiful DnD Preview" {
  uses = "actions/zeit-now@1.0.0"
  args = "alias --scope=palmer `cat $GITHUB_WORKSPACE/deploy.txt` changecast-1-$GITHUB_SHA"
  secrets = ["ZEIT_TOKEN"]
  needs = ["Deploy React Beautiful DnD Preview"]
}

action "Build Material UI ChangeCast Preview" {
  uses = "./"
  args = "GITHUB_REPO_URL="
  secrets = ["GITHUB_TOKEN"]
  env = {
    REPO_URL = "https://github.com/mui-org/material-ui"
  }
}

action "Deploy Material UI Preview" {
  uses = "actions/zeit-now@1.0.0"
  secrets = ["ZEIT_TOKEN"]
  args = "--public --no-clipboard --scope=palmer deploy ./changecast > $GITHUB_WORKSPACE/deploy.txt"
  needs = ["Build Material UI ChangeCast Preview"]
}

action "Alias Material UI Preview" {
  uses = "actions/zeit-now@1.0.0"
  args = "alias --scope=palmer `cat $GITHUB_WORKSPACE/deploy.txt` changecast-2-$GITHUB_SHA"
  secrets = ["ZEIT_TOKEN"]
  needs = ["Deploy Material UI Preview"]
}

action "Build Workbox ChangeCast Preview" {
  uses = "./"
  secrets = ["GITHUB_TOKEN"]
  env = {
    REPO_URL = "https://github.com/GoogleChrome/workbox"
  }
}

action "Deploy Workbox Preview" {
  uses = "actions/zeit-now@1.0.0"
  args = "--public --no-clipboard --scope=palmer deploy ./changecast > $GITHUB_WORKSPACE/deploy.txt"
  secrets = ["ZEIT_TOKEN"]
  needs = ["Build Workbox ChangeCast Preview"]
}

action "Alias Workbox Preview" {
  uses = "actions/zeit-now@1.0.0"
  secrets = ["ZEIT_TOKEN"]
  args = "alias --scope=palmer `cat $GITHUB_WORKSPACE/deploy.txt` changecast-3-$GITHUB_SHA"
  needs = ["Deploy Workbox Preview"]
}

action "Install and Build Docs Preview" {
  uses = "nuxt/actions-yarn@master"
  args = "install && FIRST_EXAMPLE_URL=https://changecast-1-$GITHUB_SHA.now.sh SECOND_EXAMPLE_URL=https://changecast-2-$GITHUB_SHA.now.sh THIRD_EXAMPLE_URL=https://changecast-3-$GITHUB_SHA.now.sh yarn build:docs"
}

action "Deploy Docs Preview" {
  uses = "actions/zeit-now@1.0.0"
  args = "--public --no-clipboard --scope=palmer deploy ./docs/public --local-config=../now.json > $GITHUB_WORKSPACE/deploy.txt"
  secrets = ["ZEIT_TOKEN"]
  needs = ["Install and Build Docs Preview"]
}

action "Alias Docs Preview" {
  uses = "actions/zeit-now@5c51b26db987d15a0133e4c760924896b4f1512f"
  secrets = ["ZEIT_TOKEN"]
  args = "alias --scope=palmer `cat $GITHUB_WORKSPACE/deploy.txt` changecast-$GITHUB_SHA"
  needs = ["Deploy Docs Preview"]
}

workflow "Build and Deploy Docs" {
  resolves = [
    "Alias Material UI",
    "Alias Workbox",
    "Alias React Beautiful Dnd",
    "Alias Docs",
  ]
  on = "push"
}

action "Filter master" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Build React Beautiful DnD ChangeCast" {
  uses = "./"
  secrets = ["GITHUB_TOKEN"]
  env = {
    REPO_URL = "https://github.com/atlassian/react-beautiful-dnd"
  }
  needs = ["Filter master"]
}

action "Deploy React Beautiful DnD" {
  uses = "actions/zeit-now@1.0.0"
  args = "--public --no-clipboard --scope=palmer deploy ./changecast > $GITHUB_WORKSPACE/deploy.txt"
  secrets = ["ZEIT_TOKEN"]
  needs = ["Build React Beautiful DnD ChangeCast"]
}

action "Alias React Beautiful Dnd" {
  uses = "actions/zeit-now@1.0.0"
  args = "alias --scope=palmer `cat $GITHUB_WORKSPACE/deploy.txt` changecast-1"
  secrets = ["ZEIT_TOKEN"]
  needs = ["Deploy React Beautiful DnD"]
}

action "Build Material UI ChangeCast" {
  uses = "./"
  args = "GITHUB_REPO_URL="
  secrets = ["GITHUB_TOKEN"]
  env = {
    REPO_URL = "https://github.com/mui-org/material-ui"
  }
  needs = ["Filter master"]
}

action "Deploy Material UI" {
  uses = "actions/zeit-now@1.0.0"
  secrets = ["ZEIT_TOKEN"]
  args = "--public --no-clipboard --scope=palmer deploy ./changecast > $GITHUB_WORKSPACE/deploy.txt"
  needs = ["Build Material UI ChangeCast"]
}

action "Alias Material UI" {
  uses = "actions/zeit-now@1.0.0"
  args = "alias --scope=palmer `cat $GITHUB_WORKSPACE/deploy.txt` changecast-2"
  secrets = ["ZEIT_TOKEN"]
  needs = ["Deploy Material UI"]
}

action "Build Workbox ChangeCast" {
  uses = "./"
  secrets = ["GITHUB_TOKEN"]
  env = {
    REPO_URL = "https://github.com/GoogleChrome/workbox"
  }
  needs = ["Filter master"]
}

action "Deploy Workbox" {
  uses = "actions/zeit-now@1.0.0"
  args = "--public --no-clipboard --scope=palmer deploy ./changecast > $GITHUB_WORKSPACE/deploy.txt"
  secrets = ["ZEIT_TOKEN"]
  needs = ["Build Workbox ChangeCast"]
}

action "Alias Workbox" {
  uses = "actions/zeit-now@1.0.0"
  secrets = ["ZEIT_TOKEN"]
  args = "alias --scope=palmer `cat $GITHUB_WORKSPACE/deploy.txt` changecast-3"
  needs = ["Deploy Workbox"]
}

action "Install and Build Docs" {
  uses = "nuxt/actions-yarn@master"
  args = "install && FIRST_EXAMPLE_URL=https://changecast-1.now.sh SECOND_EXAMPLE_URL=https://changecast-2.now.sh THIRD_EXAMPLE_URL=https://changecast-3.now.sh yarn build:docs"
  needs = ["Filter master"]
}

action "Deploy Docs" {
  uses = "actions/zeit-now@1.0.0"
  args = "--public --no-clipboard --scope=palmer deploy ./docs/public --local-config=../now.json > $GITHUB_WORKSPACE/deploy.txt"
  secrets = ["ZEIT_TOKEN"]
  needs = ["Install and Build Docs"]
}

action "Alias Docs" {
  uses = "actions/zeit-now@5c51b26db987d15a0133e4c760924896b4f1512f"
  secrets = ["ZEIT_TOKEN"]
  args = "alias --scope=palmer `cat $GITHUB_WORKSPACE/deploy.txt` changecast"
  needs = ["Deploy Docs"]
}
