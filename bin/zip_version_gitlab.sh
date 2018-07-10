#!/usr/bin/env bash
set -e

# Get version number from package json version
VERSION_NUMBER=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | xargs)

echo "##########################################"
echo "#                                        #"
echo "# Zip version ${VERSION_NUMBER}...       #"
echo "#                                        #"
echo "##########################################"

# Create a zip file that is attached to the gitlab release
mkdir -p zip
cp -r dist zip/${VERSION_NUMBER}
cd zip
zip -r app.zip ${VERSION_NUMBER}
mkdir -p public
mv app.zip public/aux-app-v${VERSION_NUMBER}.zip
rm -rf ${VERSION_NUMBER}
cd ..

echo "##########################################"
echo "#                                        #"
echo "# Version is zipped!                     #"
echo "#                                        #"
echo "##########################################"
