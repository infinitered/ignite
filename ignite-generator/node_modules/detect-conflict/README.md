detect-conflict
=================

Small utility library that check if a new file content can be merged safely in the on-disk existing file.

## Usage

### Example
```js
var conflict = require('detect-conflict');

var isConflicting = conflict('some-file-name.js', 'var newContent;');
```

It'll return `true` if a conflict is found, `false` otherwise.

### API

#### `conflict(filepath : string, contents : Buffer | String)`

If the `contents` is passed as a string, we assume it is utf8 encoded. Pass a `Buffer` if you want to compare special encoding.

If `filepath` points to a directory, we'll always return `true`.
