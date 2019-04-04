#!/bin/sh -l

cd /changecast

URL=$URL \
TITLE=$TITLE \
LOGO_URL=$LOGO_URL \ 
PRIMARY_COLOR=$PRIMARY_COLOR \
GITHUB_REPO_URL="https://github.com/$GITHUB_REPOSITORY" \
GITHUB_ACCESS_TOKEN=$GITHUB_TOKEN \
yarn build

mkdir "$GITHUB_WORKSPACE/changecast"
cp -r /changecast/site/public/. "$GITHUB_WORKSPACE/changecast"