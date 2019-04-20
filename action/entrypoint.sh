#!/bin/sh -l

cd /changecast

if [[ -z "${REPO_URL}" ]]; then
  sh -c "GITHUB_REPO_URL=$REPO_URL GITHUB_ACCESS_TOKEN=$GITHUB_TOKEN yarn build"
else
  sh -c "GITHUB_REPO_URL=https://github.com/$GITHUB_REPOSITORY GITHUB_ACCESS_TOKEN=$GITHUB_TOKEN yarn build"
fi

mkdir "$GITHUB_WORKSPACE/changecast"
cp -r /changecast/site/public/. "$GITHUB_WORKSPACE/changecast"