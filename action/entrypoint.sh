#!/bin/sh -l

cd /changecast

if [ -z ${REPO_URL+x} ]; then
  sh -c "REPO_URL=https://github.com/$GITHUB_REPOSITORY $* yarn build"
else
  sh -c "REPO_URL=$REPO_URL $* yarn build"
fi

mkdir "$GITHUB_WORKSPACE/changecast"
cp -r /changecast/site/public/. "$GITHUB_WORKSPACE/changecast"
