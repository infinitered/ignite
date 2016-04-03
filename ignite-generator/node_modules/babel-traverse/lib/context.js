"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _path = require("./path");

var _path2 = _interopRequireDefault(_path);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var testing = process.env.NODE_ENV === "test";

var TraversalContext = (function () {
  function TraversalContext(scope, opts, state, parentPath) {
    _classCallCheck(this, TraversalContext);

    this.queue = null;

    this.parentPath = parentPath;
    this.scope = scope;
    this.state = state;
    this.opts = opts;
  }

  /**
   * This method does a simple check to determine whether or not we really need to attempt
   * visit a node. This will prevent us from constructing a NodePath.
   */

  TraversalContext.prototype.shouldVisit = function shouldVisit(node) {
    var opts = this.opts;
    if (opts.enter || opts.exit) return true;

    // check if we have a visitor for this node
    if (opts[node.type]) return true;

    // check if we're going to traverse into this node
    var keys = t.VISITOR_KEYS[node.type];
    if (!keys || !keys.length) return false;

    // we need to traverse into this node so ensure that it has children to traverse into!
    for (var _iterator = keys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var key = _ref;

      if (node[key]) return true;
    }

    return false;
  };

  TraversalContext.prototype.create = function create(node, obj, key, listKey) {
    return _path2["default"].get({
      parentPath: this.parentPath,
      parent: node,
      container: obj,
      key: key,
      listKey: listKey
    });
  };

  TraversalContext.prototype.maybeQueue = function maybeQueue(path, notPriority) {
    if (this.trap) {
      throw new Error("Infinite cycle detected");
    }

    if (this.queue) {
      if (notPriority) {
        this.queue.push(path);
      } else {
        this.priorityQueue.push(path);
      }
    }
  };

  TraversalContext.prototype.visitMultiple = function visitMultiple(container, parent, listKey) {
    // nothing to traverse!
    if (container.length === 0) return false;

    var queue = [];

    // build up initial queue
    for (var key = 0; key < container.length; key++) {
      var node = container[key];
      if (node && this.shouldVisit(node)) {
        queue.push(this.create(parent, container, key, listKey));
      }
    }

    return this.visitQueue(queue);
  };

  TraversalContext.prototype.visitSingle = function visitSingle(node, key) {
    if (this.shouldVisit(node[key])) {
      return this.visitQueue([this.create(node, node, key)]);
    } else {
      return false;
    }
  };

  TraversalContext.prototype.visitQueue = function visitQueue(queue) {
    // set queue
    this.queue = queue;
    this.priorityQueue = [];

    var visited = [];
    var stop = false;

    // visit the queue
    for (var _i2 = 0; _i2 < queue.length; _i2++) {
      var path = queue[_i2];
      path.resync();

      if (path.contexts.length === 0 || path.contexts[path.contexts.length - 1] !== this) {
        // The context might already have been pushed when this path was inserted and queued.
        // If we always re-pushed here, we could get duplicates and risk leaving contexts
        // on the stack after the traversal has completed, which could break things.
        path.pushContext(this);
      }

      // this path no longer belongs to the tree
      if (path.key === null) continue;

      if (testing && queue.length >= 1000) {
        this.trap = true;
      }

      // ensure we don't visit the same node twice
      if (visited.indexOf(path.node) >= 0) continue;
      visited.push(path.node);

      if (path.visit()) {
        stop = true;
        break;
      }

      if (this.priorityQueue.length) {
        stop = this.visitQueue(this.priorityQueue);
        this.priorityQueue = [];
        this.queue = queue;
        if (stop) break;
      }
    }

    // clear queue
    for (var _i3 = 0; _i3 < queue.length; _i3++) {
      var path = queue[_i3];
      path.popContext();
    }

    // clear queue
    this.queue = null;

    return stop;
  };

  TraversalContext.prototype.visit = function visit(node, key) {
    var nodes = node[key];
    if (!nodes) return false;

    if (Array.isArray(nodes)) {
      return this.visitMultiple(nodes, node, key);
    } else {
      return this.visitSingle(node, key);
    }
  };

  return TraversalContext;
})();

exports["default"] = TraversalContext;
module.exports = exports["default"];