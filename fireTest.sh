# ignite generator version
node -e "var o = require('./ignite-generator/package.json'); console.log(o.version);"

# See if version is in index
grep -q '1.3.2' ignite-generator/src/app/index.es

# see if version is matched in CLI
