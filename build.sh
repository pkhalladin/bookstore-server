#!/bin/sh

echo "Starting build"

npm ci --omit=dev

cd client
npm ci --include=dev
npm run build
rm -rf client/node_modules/
cd ../

echo "Build complete"