#!/usr/bin/env bash
set -e

RELEASE_GIT_NAME="Gitlab Agent"
RELEASE_GIT_MAIL="agent@gitlab.com"

# activate the ssh-agent
which ssh-agent || ( apt-get update -y && apt-get install openssh-client -y )
eval $(ssh-agent -s)

# load the private key, which is accesible as a environment variable
mkdir -p ~/.ssh
echo "$GIT_SSH_PRIV_KEY" > ~/.ssh/id_rsa
chmod 700 ~/.ssh/id_rsa
ssh-add ~/.ssh/id_rsa

# ensure that ssh will trust a new host, instead of asking
echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config

# the repo is initially cloned with https so we change the
# remote origin to point to the ssh access
git remote set-url origin git@gitlab.com:auxapp/web.git

# This replaces the current commiter for the release
git config user.name "$RELEASE_GIT_NAME"
git config user.email "$RELEASE_GIT_MAIL"
