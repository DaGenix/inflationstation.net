#!/bin/bash

set -e
set -u

rm -rf out
npm run build
npm run export
node ./upload.js
