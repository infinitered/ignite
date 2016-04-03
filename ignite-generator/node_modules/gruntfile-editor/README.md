Gruntfile Editor
================

[![npm](https://badge.fury.io/js/gruntfile-editor.svg)](http://badge.fury.io/js/gruntfile-editor) [![tests](https://travis-ci.org/SBoudrias/gruntfile-editor.svg?branch=master)](https://travis-ci.org/SBoudrias/gruntfile-editor) [![Coverage Status](https://coveralls.io/repos/github/SBoudrias/gruntfile-editor/badge.svg?branch=master)](https://coveralls.io/github/SBoudrias/gruntfile-editor?branch=master) [![dependencies](https://david-dm.org/SBoudrias/gruntfile-editor.svg?theme=shields.io)](https://david-dm.org/SBoudrias/gruntfile-editor)

An API to modify a `Gruntfile.js` content

Installation
---------------

```
npm install --save gruntfile-editor
```

Example
---------------

```javascript
var GruntfileEditor = require('gruntfile-editor');
var editor = new GruntfileEditor();

editor.insertConfig('compass', '{ foo: "bar" }');

fs.writeFileSync('Gruntfile.js', editor.toString());
```

API
--------------

### `new GruntfileEditor( content )`

Create a new editor instance. You can pass the content of the Gruntfile to edit to the constructor. If no content is provided, a default file structure is used.

### `editor.insertConfig( name, config )`

Insert a configuration block inside the `grunt.initConfig()` call.

### `editor.registerTask( name, tasks )`

Register a task inside a named task group

```javascript
editor.registerTask('build', 'compass');
// output: grunt.registerTask('build', ['compass']);

editor.registerTask('build', ['compass', 'uglify']);
// output: grunt.registerTask('build', ['compass', 'uglify']);
```

You can specify an optional description.

```javascript
editor.registerTask('build', 'A task description', ['compass', 'uglify']);
// output: grunt.registerTask('build', 'A task description', ['compass', 'uglify']);
```

### `editor.insertVariable( name, value )`

Insert a variable to the top of the Gruntfile.

```javascript
editor.insertVariable('root', '"project/foo"');
// output: var root = 'project/foo';
```

### `editor.prependJavaScript( code )`

Insert a piece of arbritary JavaScript code to the top of the Gruntfile.

```javascript
editor.prependJavaScript('require(\'load-grunt-tasks\')(grunt);');
// output: require('load-grunt-tasks')(grunt);
```

### `editor.loadNpmTasks( pluginName )`

Load a Grunt plugin.

```javascript
editor.loadNpmTasks('grunt-contrib-uglify');
// output: grunt.loadNpmTasks("grunt-contrib-uglify");

editor.loadNpmTasks(['grunt-contrib-uglify', 'grunt-contrib-concat']);
// output:
// grunt.loadNpmTasks("grunt-contrib-concat");
// grunt.loadNpmTasks("grunt-contrib-uglify");
```


### `editor.toString()`

Returns the modified Gruntfile as a string.

Licence
-----------

Copyright (c) 2012 Simon Boudrias (twitter: @vaxilart)  
Licensed under the MIT license.
