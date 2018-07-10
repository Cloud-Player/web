#!/usr/bin/env bash
set -e

RELEASE_GIT_NAME="Bob Builder"
RELEASE_GIT_MAIL="hello@cloud-player.io"

CURRENT_GIT_USER=`git config user.name`
CURRENT_GIT_USERMAIL=`git config user.email`
CURRENT_BRANCH=`git rev-parse --abbrev-ref HEAD`

# Sets everything back to the beginning, before the release process has been started
reset () {
    git reset --hard origin/$CURRENT_BRANCH
    git config user.name "$CURRENT_GIT_USER"
    git config user.email "$CURRENT_GIT_USERMAIL"
    git remote remove origin_gh
}

# Shows error message and exits with statuscode 1
exit_with_error () {
    echo $1
    exit 1
}

# Check if GH_REF and GH_TOKEN env variables are set. They are configured in .travis.yml
if [ -z "$GH_REF" ] || [ -z "$GH_TOKEN" ]
then
  echo In order to release the env variable GH_REF and GH_TOKEN has to be set!
  exit 1
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

# This replaces the current commiter for the release
git config user.name "$RELEASE_GIT_NAME"
git config user.email "$RELEASE_GIT_MAIL"

# Calls function when script exits (error and success)
trap reset EXIT

# Get version number from package json version
VERSION_NUMBER=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | xargs)

# Get changelog from current version. Version has to be mentioned in Changelog: `# vX.X.X`
CHANGELOG=$(sed -n -e "/# v$VERSION_NUMBER/,/# v/ p" CHANGELOG.md \
  | sed -e '1d;$d')

# Ignore changes of package-lock.json
git checkout -- package-lock.json

# Check if a tag with the same version already exists
if [ "$(git ls-remote origin_gh refs/tags/v${VERSION_NUMBER})" ]; then
 echo Skipping deployment because tag for version ${VERSION_NUMBER} already exists. Increment version number to release a new version
 exit 0;
fi

# Check if there are any local changes that are not committed yet
if [ -n "$(git status --porcelain)" ]; then
  git status --porcelain
  exit_with_error "There are changes that are not committed yet. Make sure you have checked in all changes before you run this script!";
fi

# Check if all changes have been pushed to remote
if [ "$(git log origin_gh/$CURRENT_BRANCH..HEAD)" ]; then
  exit_with_error "Not all changes are pushed! Please push all changes before you run this script"
fi

# Check if version is mentioned in CHANGELOG.md
if [ "$CHANGELOG" == "" ] ; then
  exit_with_error "No entry was found in CHANGELOG.md that highlights the changes of v$VERSION_NUMBER. Please create an entry \"# v$VERSION_NUMBER\" and write down the changes"
fi

echo "##########################################"
echo " Releasing version ${VERSION_NUMBER}... "
echo "##########################################"

# The .releaseignore becomes the gitignore for the release so that files that are actually ignored can be released (e.g. the dist folder)
# After the commit the actual .gitignore will be set
mv .gitignore .ignore_tmp
cp .releaseignore .gitignore

git add -A
git reset .gitignore
git reset .ignore_tmp
git reset .releaseignore
if [ "$(git diff --cached --exit-code)" ]
then
  git commit -m "release version ${VERSION_NUMBER}"
  RELEASE_COMMIT_HASH=`git rev-parse --verify HEAD`
else
  mv .gitignore .releaseignore
  mv .ignore_tmp .gitignore
  exit_with_error "${VERSION_NUMBER} did not contain any changes so the release is aborted"
fi

mv .gitignore .releaseignore
mv .ignore_tmp .gitignore

# Create tag and push it
git tag -a v${VERSION_NUMBER} -m "Version ${VERSION_NUMBER}" -m "${CHANGELOG}"
git push origin_gh --tags --no-verify > /dev/null 2>&1 || exit_with_error "Could not publish tag v${VERSION_NUMBER}"

echo "##########################################"
echo " Version ${VERSION_NUMBER} is released! "
echo "##########################################"
