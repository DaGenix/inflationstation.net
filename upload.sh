#!/bin/bash

set -e
set -u

rm -rf out
npm run build
node ./upload.js
