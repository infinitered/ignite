// @cliDescription  Digests the source map file to display proper feedback
// @cliAlias source-map
// ----------------------------------------------------------------------------

const SourceMapConsumer = require('source-map').SourceMapConsumer
const exitCodes = require('../lib/exitCodes')

/*
* Example 1:  To get one specific mapping
* ignite source-map --map ./someFolder/index.ios.map --line 32 --column 76
* ignite source-map -m ./someFolder/index.ios.map -l -32 -c 76
*
* Example 2:  To parse a stack trace string and convert it to usable output
* ignite source-map --mapfile ./someFolder/index.ios.map --stackfile stackTrace.txt
* ignite source-map -m ./someFolder/index.ios.map -s stackTrace.txt
*/
module.exports = async function (context) {
  const { print, parameters, filesystem } = context
  const { options } = parameters
  // get options
  const mapfile = options.mapfile || options.m
  const line = options.line || options.l
  const column = options.column || options.c
  const stackfile = options.stackfile || options.s

  // make sure mapfile is passed with line+column || stackfile supplied
  const optionsValid = (mapfile && ((line && column) || stackfile))
  if (!optionsValid) {
    context.print.error(`You must pass a mapfile AND either a line+column or a stackfile.
    e.g.
    ignite source-map --map ./someFolder/index.ios.map --line 32 --column 76
    ignite source-map --mapfile ./someFolder/index.ios.map --stackfile stackTrace.txt
    `)
    process.exit(exitCodes.INVALID_PARAMETERS)
  }

  //consume sourcemap
  const rawSourceMap = filesystem.read(options.mapfile)
  const smc = new SourceMapConsumer(rawSourceMap)

  print.info(smc.originalPositionFor({line, column}))
}

