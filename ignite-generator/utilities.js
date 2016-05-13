#! /usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertInFile = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Use this sparingly, as file contents are fickle!
var insertInFile = exports.insertInFile = function insertInFile(theFile, theFind, theInsert) {
  var insertAfter = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

  // read full file - Not a great idea if we ever touch large files
  var data = _fs2.default.readFileSync(theFile, 'utf-8');
  var newContents = '';
  // get the full line of first occurance
  var finder = new RegExp('.*' + theFind + '.*', '');
  var matches = data.match(finder);
  // Quick error check
  if (matches.length === 0) throw new Error('\'' + theFind + '\' was not found in file.');

  // insert contents into file
  if (insertAfter) {
    newContents = data.replace(finder, matches[0] + '\n' + theInsert);
  } else {
    newContents = data.replace(finder, theInsert + '\n' + matches[0]);
  }

  // overwrite file with modified contents
  _fs2.default.writeFileSync(theFile, newContents, 'utf-8');
};