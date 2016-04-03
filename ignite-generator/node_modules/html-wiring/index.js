'use strict';
var util = require('util');
var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');
var detectNewline = require('detect-newline');

/**
 * @mixin
 * @alias actions/wiring
 */
var wiring = module.exports;

/**
 * Update a file containing HTML markup with new content, either
 * appending, prepending or replacing content matching a particular
 * selector.
 *
 * The following modes are available:
 *
 *   - `a` Append
 *   - `p` Prepend
 *   - `r` Replace
 *   - `d` Delete
 *
 * @param {String} html
 * @param {String} tagName
 * @param {String} content
 * @param {String} mode
 */

wiring.domUpdate = function domUpdate(html, tagName, content, mode) {
  var $ = cheerio.load(html, { decodeEntities: false });

  if (content !== undefined) {
    if (mode === 'a') {
      $(tagName).append(content);
    } else if (mode === 'p') {
      $(tagName).prepend(content);
    } else if (mode === 'r') {
      $(tagName).html(content);
    } else if (mode === 'd') {
      $(tagName).remove();
    }
    return $.html();
  } else {
    console.error('Please supply valid content to be updated.');
  }
};

/**
 * Insert specific content as the last child of each element matched
 * by the `tagName` selector.
 *
 * @param {String} html
 * @param {String} tagName
 * @param {String} content
 */

wiring.append = function append(html, tagName, content) {
  return this.domUpdate(html, tagName, content, 'a');
};

/**
 * Insert specific content as the first child of each element matched
 * by the `tagName` selector.
 *
 * @param {String} html
 * @param {String} tagName
 * @param {String} content
 */

wiring.prepend = function prepend(html, tagName, content) {
  return this.domUpdate(html, tagName, content, 'p');
};

/**
 * Insert specific content as the last child of each element matched
 * by the `tagName` selector. Writes to file.
 *
 * @param {String} path
 * @param {String} tagName
 * @param {String} content
 */

wiring.appendToFile = function appendToFile(path, tagName, content) {
  var html = this.readFileAsString(path);
  var updatedContent = this.append(html, tagName, content);
  this.writeFileFromString(updatedContent, path);
};

/**
 * Insert specific content as the first child of each element matched
 * by the `tagName` selector. Writes to file.
 *
 * @param {String} path
 * @param {String} tagName
 * @param {String} content
 */

wiring.prependToFile = function prependToFile(path, tagName, content) {
  var html = this.readFileAsString(path);
  var updatedContent = this.prepend(html, tagName, content);
  this.writeFileFromString(updatedContent, path);
};

/**
 * Generate a usemin-handler block.
 *
 * @param {String} blockType
 * @param {String} optimizedPath
 * @param {String} filesBlock
 * @param {String|Array} searchPath
 */

wiring.generateBlock = function generateBlock(blockType, optimizedPath, filesBlock, searchPath, eolChar) {
  var blockStart;
  var blockEnd;
  var blockSearchPath = '';

  if (searchPath !== undefined) {
    if (util.isArray(searchPath)) {
      searchPath = '{' + searchPath.join(',') + '}';
    }
    blockSearchPath = '(' + searchPath + ')';
  }

  blockStart = eolChar + wiring.appendIndent('<!-- build:' + blockType + blockSearchPath + ' ' + optimizedPath + ' -->' + eolChar);
  blockEnd = wiring.appendIndent('<!-- endbuild -->' + eolChar);
  return blockStart + filesBlock + blockEnd;
};

/**
 * Append files, specifying the optimized path and generating the necessary
 * usemin blocks to be used for the build process. In the case of scripts and
 * styles, boilerplate script/stylesheet tags are written for you.
 *
 * @param {String|Object} htmlOrOptions
 * @param {String} fileType
 * @param {String} optimizedPath
 * @param {Array} sourceFileList
 * @param {Object} attrs
 * @param {String} searchPath
 */

wiring.appendFiles = function appendFiles(htmlOrOptions, fileType, optimizedPath, sourceFileList, attrs, searchPath) {
  var blocks;
  var updatedContent;
  var html = htmlOrOptions;
  var files = '';
  var eolChar;

  if (typeof htmlOrOptions === 'object') {
    html = htmlOrOptions.html;
    fileType = htmlOrOptions.fileType;
    optimizedPath = htmlOrOptions.optimizedPath;
    sourceFileList = htmlOrOptions.sourceFileList;
    attrs = htmlOrOptions.attrs;
    searchPath = htmlOrOptions.searchPath;
  }

  attrs = this.attributes(attrs);

  eolChar = detectNewline(html);

  if (fileType === 'js') {
    sourceFileList.forEach(function (el) {
      files += wiring.appendIndent('<script ' + attrs + ' src="' + el + '"></script>' + eolChar);
    });
    blocks = this.generateBlock('js', optimizedPath, files, searchPath, eolChar);
    updatedContent = this.append(html, 'body', blocks);
  } else if (fileType === 'css') {
    sourceFileList.forEach(function (el) {
      files += wiring.appendIndent('<link ' + attrs + ' rel="stylesheet" href="' + el + '">' + eolChar);
    });
    blocks = this.generateBlock('css', optimizedPath, files, searchPath, eolChar);
    updatedContent = this.append(html, 'head', blocks);
  }

  // cleanup trailing whitespace
  return updatedContent.replace(/[\t ]+$/gm, '');
};

/**
 * Computes a given Hash object of attributes into its HTML representation.
 *
 * @param {Object} attrs
 */

wiring.attributes = function attributes(attrs) {
  return Object.keys(attrs || {}).map(function (key) {
    return key + '="' + attrs[key] + '"';
  }).join(' ');
};

/**
 * Scripts alias to `appendFiles`.
 *
 * @param {String} html
 * @param {String} optimizedPath
 * @param {Array} sourceFileList
 * @param {Object} attrs
 * @param {String} searchPath
 */

wiring.appendScripts = function appendScripts(html, optimizedPath, sourceFileList, attrs, searchPath) {
  return this.appendFiles(html, 'js', optimizedPath, sourceFileList, attrs, searchPath);
};

/**
 * Simple script removal.
 *
 * @param {String} html
 * @param {String} scriptPath
 */

wiring.removeScript = function removeScript(html, scriptPath) {
  return this.domUpdate(html, 'script[src$="' + scriptPath + '"]', '', 'd');
};

/**
 * Style alias to `appendFiles`.
 *
 * @param {String} html
 * @param {String} optimizedPath
 * @param {Array} sourceFileList
 * @param {Object} attrs
 * @param {String} searchPath
 */

wiring.appendStyles = function appendStyles(html, optimizedPath, sourceFileList, attrs, searchPath) {
  return this.appendFiles(html, 'css', optimizedPath, sourceFileList, attrs, searchPath);
};

/**
 * Simple style removal.
 *
 * @param {String} html
 * @param {String} path
 */

wiring.removeStyle = function removeStyle(html, path) {
  return this.domUpdate(html, 'link[href$="' + path + '"]', '', 'd');
};

/**
 * Append a directory of scripts.
 *
 * @param {String} html
 * @param {String} optimizedPath
 * @param {String} sourceScriptDir
 * @param {Object} attrs
 */

wiring.appendScriptsDir = function appendScriptsDir(html, optimizedPath, sourceScriptDir, attrs) {
  var sourceScriptList = fs.readdirSync(path.resolve(sourceScriptDir));
  return this.appendFiles(html, 'js', optimizedPath, sourceScriptList, attrs);
};

/**
 * Append a directory of stylesheets.
 *
 * @param {String} html
 * @param {String} optimizedPath
 * @param {String} sourceStyleDir
 * @param {Object} attrs
 */

wiring.appendStylesDir = function appendStylesDir(html, optimizedPath, sourceStyleDir, attrs) {
  var sourceStyleList = fs.readdirSync(path.resolve(sourceStyleDir));
  return this.appendFiles(html, 'css', optimizedPath, sourceStyleList, attrs);
};

/**
 * Read in the contents of a resolved file path as a string.
 *
 * @param {String} filePath
 */

wiring.readFileAsString = function readFileAsString(filePath) {
  return fs.readFileSync(path.resolve(filePath), 'utf8');
};

/**
 * Write the content of a string to a resolved file path.
 *
 * @param {String} html
 * @param {String} filePath
 */

wiring.writeFileFromString = function writeFileFromString(html, filePath) {
  fs.writeFileSync(path.resolve(filePath), html, 'utf8');
};

/**
 * Append the indent of a string to a line text.
 *
 * @param {String} line line text
 * @return {String} indented line text
 */

wiring.appendIndent = function (line) {
  return wiring.defaults.indent + line;
};

wiring.defaults = {
  indent: '    '
};
