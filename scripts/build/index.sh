# Build CJS Modules
rm -rf cjs
node_modules/.bin/tsc -p tsconfig.build.json
node_modules/.bin/ef-tspm -c tsconfig.build.json
rm -rf cjs/tsconfig.build.tsbuildinfo

# Build ES Modules
rm -rf esm
node_modules/.bin/tsc -p tsconfig.esm.json
node_modules/.bin/ef-tspm -c tsconfig.esm.json
find ./esm/ -name "*.js" -exec bash -c 'mv "$1" "${1%.js}".mjs' - '{}' \;
rm -rf esm/tsconfig.esm.tsbuildinfo