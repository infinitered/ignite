AST Query
================

[![npm](https://badge.fury.io/js/ast-query.svg)](http://badge.fury.io/js/ast-query) [![tests](https://travis-ci.org/SBoudrias/AST-query.svg?branch=master)](http://travis-ci.org/SBoudrias/AST-query) [![dependencies](https://david-dm.org/SBoudrias/AST-query.svg?theme=shields.io)](https://david-dm.org/SBoudrias/AST-query)


This project is a tentative to create a simple JavaScript AST modification library.

If you've ever worked with AST trying to edit source code, you'll know it is a bad time. AST syntax is terse and forces you to loop a tree and use conditional structure a lot. AST Query hide these complexities behind a declarative façade.

Making the simplicity choice means AST Query won't try to cover the full AST API. Rather we strive to answer commons needs.


Getting Started
================

Install: `npm install --save ast-query`

First, you need to pass a program code into AST query:

``` javascript
var program = require("ast-query");
var tree = program("var a = 'foo'");
```

This function returns a wrapped AST tree you can query and modify.

Once you've modified the AST, get the source code back by calling the `toString` method on the tree.

``` javascript
// ...
tree.var("a").value("'bar'");

console.log( tree.toString() );
// LOG: var a = 'bar';
```

Remember that you are editing source code. This mean you provide raw source code strings. This mean you need to double wrap strings (e.g.: `"'foo'"`). If that's not done, AST-query assume you're referencing a variable called `foo`.


API
================

Program
----------------

### `var tree = program( sourceCode, escodegenOptions, esprimaOptions )`
- **sourceCode** (String) - The source code to edit.
- **escodegenOptions** (Object) _optional_ - [escodegen](https://github.com/Constellation/escodegen) option object
- **esprimaOptions** (Object) _optional_ - [esprima](http://esprima.org/doc) option object

Returns an AST tree you can then query as explained below:

### `tree.var( name )`
- **name** (String) - The variable name

Find and returns a [`Variable` node](#variable-node).

Given this code

``` js
var bar = 23;
```

You'd call `tree.var('bar')` to get the Variable node.

### `tree.callExpression( name )`
- **name** (String) - The name of the function or method being called.

Find a function or method call and return a [`CallExpression` node](#callexpression-node)

Given this code

```js
grunt.initConfig({});
```

You'd call `tree.callExpression('grunt.initConfig')` to get the CallExpression node.

### `tree.assignment( assignedTo )`
- **assignedTo** (String) - The name (name or object) a value is assigned to

Find and return an [`AssignmentExpression` node](#assignmentexpression-node).

You'd call `tree.assignment('module.exports')` to query the code below:

```js
module.exports = function () {
  // code
};
```

### `tree.body`

Property representing the program body in a [`Body` node](#body-node).

Variable node
-----------------

### `.value( value )`
- **value** (String) _optionnal_ - A string containing the new variable value.

It returns the current or new value wrapped in AST query interface.

### `.rename( name )`
- **name** (String) - Change the variable name

CallExpression node
--------------------

### `.filter( iterator )`
- **iterator** (Function) - Function receiving each node as arguments and returning true to keep the current node in the returned set.

Return a new CallExpression nodes collection with nodes passing the iterator test.

### `.arguments`

A property pointing to an [`ArrayExpression` node](#arrayexpression-node) referencing the called function arguments.

AssignmentExpression node
--------------------

### `.value( value )`

Replace the assignment value with a new value or return the current value wrapped in an AST query interface.

Literal node
--------------------

A Literal node represent a raw JavaScript value as a String, a Number or a Boolean.

### `.value( value )`

Get or update the value.

FunctionExpression node
-------------------

Node representing a function declaration (e.g. `function () {}`).

### `.body`

Property pointing to a [`Body` node](#body-node) representing the function expression body.

ObjectExpression node
-------------------

### `.key( name )`
- **name** (String) - Key name
Get a key value object or create a blank placeholder

### `value( value )`

Replace current node with a new value. Returns the new value wrapped.

ArrayExpression node
-------------------

### `.push( value )`
- **value** (String) - value to push in the array

### `.unshift( value )`
- **value** (String) - value to unshift in the array

### `.at( index )`
- **index** (Number) - Index of the value to fetch

Returns a value wrapped in an AST query interface.

### `value( value )`

Replace current node with a new value. Returns the new value wrapped.

Body node
-------------------

### `.prepend( code )`

Preprend the given code lines in the body. If a `"use strict";` statement is present, it always stay first.

### `.append( code )`

Append the given code lines in the body.

Contributing
=====================

**Style Guide**: Please base yourself on [Idiomatic.js](https://github.com/rwldrn/idiomatic.js)
style guide with two space indent  
**Unit test**: Unit test are wrote in Mocha. Please add a unit test for every new feature
or bug fix. `npm test` to run the test suite.  
**Documentation**: Add documentation for every API change. Feel free to send corrections
or better docs!  
**Pull Requests**: Send _fixes_ PR on the `master` branch. Any new features should be send
on the `wip`branch.


License
=====================

Copyright (c) 2013 Simon Boudrias (twitter: @vaxilart)  
Licensed under the MIT license.
