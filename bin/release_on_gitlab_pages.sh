#!/usr/bin/env bash
set -e

echo "##########################################"
echo "#                                        #"
echo "# Releasing...                           #"
echo "#                                        #"
echo "##########################################"

mkdir -p public
mv dist/* public

echo "##########################################"
echo "#                                        #"
echo "# Page is released!                      #"
echo "#                                        #"
echo "##########################################"
