#!/usr/bin/env bash
set -e

RELEASE_GIT_NAME="Bob Builder"
RELEASE_GIT_MAIL="hello@aux.app"

which ssh-agent || ( apt-get update -y && apt-get install openssh-client -y )
eval $(ssh-agent -s)
ssh-add <(echo "$GIT_SSH_PRIV_KEY")
git config --global user.email "${RELEASE_GIT_MAIL}"
git config --global user.name "${RELEASE_GIT_NAME}"
mkdir -p ~/.ssh
cat gitlab-known-hosts >> ~/.ssh/known_hosts
