'use strict';

var sync           = require('spawn-sync');
var crossSpawn     = require('cross-spawn-async');
var parse          = require('cross-spawn-async/lib/parse');
var enoent         = require('cross-spawn-async/lib/enoent');
var resolveCommand = require('cross-spawn-async/lib/resolveCommand');

var isWin    = process.platform === 'win32';
var isNode10 = process.version.indexOf('v0.10.') === 0;

function verifySyncENOENT(status, parsed) {
    // First check against the standard enoent.verifyENOENT
    var err = enoent.verifyENOENT(status, parsed, 'spawnSync');

    if (err) {
        return err;
    }

    // If we are in node 10, then we are using spawn-sync; if it exited
    // with -1 it probably means that the command does not exist
    if (isNode10 && status === -1) {
        parsed.file = isWin ? parsed.file : resolveCommand(parsed.original);

        if (!parsed.file) {
            err = enoent.notFoundError(parsed.original, 'spawnSync');
        }
    }

    return err;
}

function spawn(command, args, options) {
    return crossSpawn.spawn(command, args, options);
}

function spawnSync(command, args, options) {
    var parsed;
    var result;

    // Parse the arguments
    parsed = parse(command, args, options);

    // Spawn the child process
    result = sync(parsed.command, parsed.args, parsed.options);

    // Analyze if the command does not exists, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    result.error = result.error || verifySyncENOENT(result.status, parsed);

    return result;
}

module.exports       = spawn;
module.exports.spawn = spawn;
module.exports.sync  = spawnSync;
