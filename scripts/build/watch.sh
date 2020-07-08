# Build Watch CJS Modules
node_modules/.bin/nodemon -e ts -w src \
 -x 'node_modules/.bin/tsc -p tsconfig.build.json && node_modules/.bin/ef-tspm -c tsconfig.build.json && node cjs/index.js'