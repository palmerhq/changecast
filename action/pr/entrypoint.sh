#!/bin/sh -l

yarn install

sh -c "GITHUB_REPO_URL=$REPO_URL GITHUB_ACCESS_TOKEN=$GITHUB_TOKEN yarn build"

mkdir "$GITHUB_WORKSPACE/changecast"
cp -r /changecast/site/public/. "$GITHUB_WORKSPACE/changecast"