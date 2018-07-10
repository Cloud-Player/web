#!/usr/bin/env bash
set -e

# Get version number from package json version
VERSION_NUMBER=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | xargs)

echo "####################################"
echo " Zip version ${VERSION_NUMBER}... "
echo "####################################"

# Create a zip file that is attached to the github release
mkdir -p zip
cp -r dist zip/${VERSION_NUMBER}
cd zip
zip -r cloud-player-v${VERSION_NUMBER}.zip ${VERSION_NUMBER}
rm -rf ${VERSION_NUMBER}
cd ..
