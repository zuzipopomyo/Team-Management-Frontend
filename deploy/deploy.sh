#!/bin/sh

set -e

ENV=$1
DEPLOY_SERVER=$2
SERVER_FOLDER="~/wk${ENV}"


echo "ENV = ${ENV}, Deploying to ${DEPLOY_SERVER}"

echo "GOOGLE_CLIENT_ID = ${GOOGLE_CLIENT_ID}  LINKEDIN_CLIENT_ID = ${LINKEDIN_CLIENT_ID}"
# set env variables
export VITE_GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
export VITE_LINKEDIN_CLIENT_ID=$LINKEDIN_CLIENT_ID

# Building React output
yarn install
yarn tsc -v
yarn build:$ENV

scp -r dist/* ubuntu@${DEPLOY_SERVER}:${SERVER_FOLDER}

echo "Finished copying the build files"
