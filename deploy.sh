#!/bin/bash
#

gulp deploy

NODE_ENV=production browserify  ./build/client.js -g [envify --NODE_ENV 'production']  > dist/bundle.js
# NODE_ENV=production webpack -p --progress

BABEL_ENV=production node_modules/.bin/babili dist/bundle.js -o dist/bundle.min.js

cp public/lib/bundle.min.js public/lib/bundle.js
