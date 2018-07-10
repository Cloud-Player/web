#!/usr/bin/env bash
set -e

REPO_REF="gitlab.com/auxapp/web"
RELEASE_GIT_NAME="Bob Builder"
RELEASE_GIT_MAIL="hello@aux.app"

echo "START"
echo "https://$CI_DEPLOY_USER:$CI_DEPLOY_PASSWORD@$REPO_REF.git"

# Set or add the remote url for the github repo with the GH_TOKEN
# The GH_TOKEN is a github personal access token https://github.com/settings/tokens
# It is encrypted with travis `$ travis encrypt GH_TOKEN=<GH_PERSONAL_TOKEN>` and set as global env via the .travis.yml
if git remote | grep origin > /dev/null
then
  git remote set-url origin https://$CI_DEPLOY_USER:$CI_DEPLOY_PASSWORD@$REPO_REF.git
else
  git remote add origin https://$GH_TOKEN@$GH_REF.git
fi
