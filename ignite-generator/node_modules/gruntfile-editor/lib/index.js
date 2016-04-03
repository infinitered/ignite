'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var Tree = require('ast-query');

/**
 * A class managing the edition of the project Gruntfile content. Editing the
 * Gruntfile using this class allow easier Generator composability as they can
 * work and add parts to the same Gruntfile without having to parse the
 * Gruntfile AST themselves.
 * @constructor
 * @param  {String} gruntfileContent - The actual `Gruntfile.js` content
 */

var GruntfileEditor = module.exports = function (gruntfileContent) {
  var defaultGruntfilePath = path.join(__dirname, 'default-gruntfile.js');
  gruntfileContent = gruntfileContent || fs.readFileSync(defaultGruntfilePath);
  this.gruntfile = new Tree(gruntfileContent.toString());
};

/**
 * Insert a configuration section inside the `Gruntfile.js` initConfig() block
 * @param  {String} name   - Key name of the configuration block
 * @param  {String} config - Configuration content code as a string.
 * @return {this}
 */

GruntfileEditor.prototype.insertConfig = function (name, config) {
  name = _.isString(name) && name.trim() || false;
  config = _.isString(config) && config.trim() || false;
  assert(name, 'You must provide a task name');
  assert(config, 'You must provide a task configuration body as a String');
  var gruntConfig = this.gruntfile.callExpression('grunt.initConfig').arguments.at(0);
  // Select nested paths
  var targetConfig = name.split('.').reduce(function (nestedConfig, key) {
    // If the parent key is undefined, then create it.
    if (!nestedConfig.node.range) {
      nestedConfig.value('{}');
    }
    return nestedConfig.key(key);
  }, gruntConfig);

  targetConfig.value(config);
  return this;
};

/**
 * Load Grunt plugins
 * @param {String|Array[String]} pluginNames - String or Array of the plugins to load (ex: "grunt-sass" or ['grunt-sass'])
 * @return {this}
 */

GruntfileEditor.prototype.loadNpmTasks = function (pluginName) {
  if (_.isString(pluginName)) {
    pluginName = pluginName.trim();
  } else if (_.isArray(pluginName) && pluginName.length) {
    pluginName = pluginName.filter(function (el) {
      return _.isString(el) && el.trim().length;
    });
    pluginName = pluginName.length && pluginName;
  } else {
    pluginName = false;
  }

  assert(pluginName, 'You must provide a plugin name');

  var currentPlugin = this.gruntfile.callExpression('grunt.loadNpmTasks')
    .nodes.map(function (node) {
      return node.arguments[0].value;
    });

  [].concat(pluginName)
    .map(function (el) {
      return el.trim();
    })
    .sort()
    .filter(function (el, index, array) {
      return (array.indexOf(el) === index) && (currentPlugin.indexOf(el) < 0);
    })
    .map(function (el) {
      return 'grunt.loadNpmTasks(\'' + el + '\');';
    })
    .forEach(function (el) {
      this.gruntfile.assignment('module.exports').value().body.prepend(el);
    }, this);
  return this;
};

/**
 * Register a task inside a named task group
 *
 * Can optionally take an object to specify options:
 *  * duplicates (false): Allow the same task to be inserted multiple times
 *
 * @param {String} name  - Task group name
 * @param {String|Array[String]} tasks - Tasks name to insert in the group
 * @param {Object} options - An optional object to specify options
 * @return {this}
 */

GruntfileEditor.prototype.registerTask = function (name, desc, tasks, options) {
  name = _.isString(name) && name.trim() ? name : false;
  assert(name, 'You must provide a task group name');

  if (options == null) {
    if ((tasks == null) || _.isPlainObject(tasks)) {
      options = tasks;
      tasks = desc;
      desc = '';
    }
  }

  assert(_.isString(desc), 'The description shall be a string');

  if (_.isString(tasks)) {
    tasks = tasks.trim() || false;
  }
  if (_.isArray(tasks)) {
    tasks = tasks.length > 0 && tasks || false;
  }
  if (!(_.isString(tasks) || _.isArray(tasks))) {
    tasks = false;
  }
  assert(tasks, 'You must provide a task or an array of tasks');

  if (options != null && !_.isPlainObject(options)) {
    assert(false, 'If you provide options, they must be as an Object');
  }

  options = _.extend({
    duplicates: false
  }, options);

  var current = this.gruntfile.callExpression('grunt.registerTask')
    .filter(function (node) {
      return node.arguments[0].value === name;
    });

  tasks = _.isArray(tasks) ? tasks : tasks.replace(/ /g, '').split(',');

  if (current.length) {
    var argCount = current.arguments.nodes[0].elements.length;
    var argList = current.arguments.at(argCount - 1);
    var currentTasks = argList.nodes[0].elements.map(function (list) {
      return list.value;
    });

    tasks.forEach(function (task) {
      if (currentTasks.indexOf(task) === -1 || options.duplicates) {
        argList.push('"' + task + '"');
      }
    });

    if (desc.length > 0) {
      if (argCount === 2) {
        // insert a new description element
        current.arguments.unshift('"' + name + '"');
      }
      current.arguments.at(1).value('"' + desc + '"');
    }
  } else {
    if (desc.length > 0) {
      desc = '"' + desc + '", ';
    }
    this.gruntfile.assignment('module.exports').value().body.append(
      'grunt.registerTask("' + name + '", ' + desc + '["' + tasks.join('","') + '"])'
    );
  }

  return this;
};

/**
 * Add a variable declaration to the Gruntfile
 * @param {String} name  - Variable name
 * @param {String} value - Variable value
 *
 * @return {this}
 */

GruntfileEditor.prototype.insertVariable = function (name, value) {
  name = _.isString(name) && name.trim() || false;
  assert(name, 'You must provide a variable name');
  value = _.isString(value) && value.trim() || false;
  assert(value, 'You must provide a variable value as a String');

  var current = this.gruntfile.var(name);
  if (current.length) {
    current.value(value);
  } else {
    this.prependJavaScript('var ' + name + ' = ' + value);
  }
  return this;
};

/**
 * Add arbitrary JavaScript code to the Gruntfile
 * @param {String} code  - Code to be inserted
 *
 * @return {this}
 */
GruntfileEditor.prototype.prependJavaScript = function (code) {
  code = _.isString(code) && code.trim() || false;
  assert(code, 'You must provide code to be inserted');

  this.gruntfile.assignment('module.exports').value().body.prepend(code);

  return this;
};

/**
 * Add arbitrary JavaScript code at the end of the Gruntfile
 * @param {String} code  - Code to be inserted
 *
 * @return {this}
 */
GruntfileEditor.prototype.appendJavaScript = function (code) {
  code = _.isString(code) && code.trim() || false;
  assert(code, 'You must provide code to be inserted');

  this.gruntfile.assignment('module.exports').value().body.append(code);

  return this;
};
/**
 * Return the Gruntfile representation as a string suitable for writing to an
 * actual `Gruntfile.js`
 * @return {String} gruntfileContent - The actual `Gruntfile.js` content
 */

GruntfileEditor.prototype.toString = function () {
  return this.gruntfile.toString();
};
