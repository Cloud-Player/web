#!/usr/bin/env bash
set -e

RELEASE_FOLDER="./dist"
RELEASE_BRANCH="gh-pages"
RELEASE_GIT_NAME="Bob Builder"
RELEASE_GIT_MAIL="bob@builder.com"
TMP_RELEASE_FOLDER="/tmp/releases/cloud-player"

CURRENT_GIT_USER=`git config user.name`
CURRENT_GIT_USERMAIL=`git config user.email`
CURRENT_BRANCH=$TRAVIS_BRANCH

# Sets everything back to the beginning, before the release process has been started
reset () {
    git checkout $CURRENT_BRANCH > /dev/null 2>&1 || echo "[RESET] Checkout of branch $CURRENT_BRANCH failed"
    git reset --hard origin/$CURRENT_BRANCH > /dev/null 2>&1 || echo "[RESET] Reset of branch $CURRENT_BRANCH failed"
    git config user.name "$CURRENT_GIT_USER"
    git config user.email "$CURRENT_GIT_USERMAIL"
    git remote remove origin_gh
}

# Shows error message and exits with statuscode 1
exit_with_error () {
    echo $1
    exit 1
}

# Ignore changes of package-lock.json
git checkout -- package-lock.json

# Check if there are any local changes that are not committed yet
if [ -n "$(git status --porcelain)" ]; then
  git status --porcelain
  exit_with_error "There are changes that are not committed yet. Make sure you have checked in all changes before you run this script!";
fi

# Check if GH_REF and GH_TOKEN env variables are set. They are configured in .travis.yml
if [ -z "$GH_REF" ] || [ -z "$GH_TOKEN" ]
then
  exit_with_error "In order to release the env variables GH_REF and GH_TOKEN have to be set!"
fi

# When Current Branch is not set use current git branch
if [ -z "$CURRENT_BRANCH" ]; then
  CURRENT_BRANCH=`git rev-parse --abbrev-ref HEAD`
fi

# Set or add the remote url for the github repo with the GH_TOKEN
# The GH_TOKEN is a github personal access token https://github.com/settings/tokens
# It is encrypted with travis `$ travis encrypt GH_TOKEN=<GH_PERSONAL_TOKEN>` and set as global env via the .travis.yml
if git remote | grep origin_gh > /dev/null
then
  git remote set-url origin_gh https://$GH_TOKEN@$GH_REF.git
else
  git remote add origin_gh https://$GH_TOKEN@$GH_REF.git
fi
git fetch origin_gh

echo "##########################################"
echo "#                                        #"
echo "# Releasing...                           #"
echo "#                                        #"
echo "##########################################"

# Calls function when script exits (error and success)
trap reset EXIT

# This replaces the current commiter for the release
git config user.name "$RELEASE_GIT_NAME"
git config user.email "$RELEASE_GIT_MAIL"

# Copy the release folder to a temporary directory
mkdir -p $TMP_RELEASE_FOLDER
cp -R $RELEASE_FOLDER/* $TMP_RELEASE_FOLDER

# Check if the release branch already exists
if [ `git branch -r --list origin_gh/$RELEASE_BRANCH` ]
then
  # branch already exists so we get the current remote version
  git branch $RELEASE_BRANCH origin_gh/$RELEASE_BRANCH
  git checkout $RELEASE_BRANCH
  git pull origin_gh $RELEASE_BRANCH
elif [ `git branch --list $RELEASE_BRANCH` ]
then
  # branch exists only locally
  git checkout $RELEASE_BRANCH
else
  # branch does not exist so it is created
  git checkout --orphan $RELEASE_BRANCH
fi

# Replace all files with the one from the repository
rm -rf *
cp -R $TMP_RELEASE_FOLDER/* .
git add -Af *

# Check if there are changes to commit
if [ -n "$(git status --porcelain)" ]; then
  git commit -am 'Release new Version'
  git push origin_gh $RELEASE_BRANCH --no-verify > /dev/null 2>&1 || exit_with_error "Could not push to branch $RELEASE_BRANCH"

  echo "##########################################"
  echo "#                                        #"
  echo "# Page is released!                      #"
  echo "#                                        #"
  echo "##########################################"
else
  echo "#################################################"
  echo "#                                               #"
  echo "# Skipping release because there are no changes #"
  echo "#                                               #"
  echo "#################################################"
fi
