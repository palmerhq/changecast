#!/bin/sh -l

cd /changecast

$* \
GITHUB_REPO_URL="https://github.com/$GITHUB_REPOSITORY" \
GITHUB_ACCESS_TOKEN=$GITHUB_TOKEN \
yarn build

mkdir "$GITHUB_WORKSPACE/changecast"
cp -r /changecast/site/public/. "$GITHUB_WORKSPACE/changecast"