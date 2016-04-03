'use strict';

var fs = require('fs');
var path = require('path');
var commondir = require('commondir');
var glob = require('glob');

function notNullOrExclusion(file) {
  return file != null && file.charAt(0) !== '!';
}

exports.getCommonPath = function (filePath) {
  if (Array.isArray(filePath)) {
    filePath = filePath
      .filter(notNullOrExclusion)
      .map(this.getCommonPath.bind(this));

    return commondir(filePath);
  }

  filePath = this.globify(filePath);
  var globStartIndex = filePath.indexOf('*');
  if (globStartIndex !== -1) {
    filePath = filePath.substring(0, globStartIndex + 1);
  }

  return path.dirname(filePath);
};

exports.globify = function (filePath) {
  if (Array.isArray(filePath)) {
    return filePath.map(this.globify.bind(this));
  }

  if (glob.hasMagic(filePath) || !fs.existsSync(filePath)) {
    return filePath;
  }

  var fsStats = fs.statSync(filePath);
  if (fsStats.isFile()) {
    return filePath;
  } else if (fsStats.isDirectory()) {
    return path.join(filePath, '**');
  } else {
    throw new Error('Only file path or directory path are supported.');
  }
};
