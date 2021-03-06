var _ = require('lodash');

var tree = exports;

/*
 * Tree object
 */

function Tree() {
  this.tree = {
    parent   : null,
    children : []
  };

  this.leaves = [];

  this.iterations = 1;
}

/*
 * Getter which returns an array with the `value` of all the children:
 *   eg: tree.children -> ['first', 'second', 'third']
 */

Object.defineProperty(Tree.prototype, 'children', {
  get: function() {
    return this.tree.children.map(function(i) { return i.value; });
  }
});

/*
 * Getter which is just an alias for `this.tree.value`, the value
 * of the current node
 */

Object.defineProperty(Tree.prototype, 'value', {
  get: function() { return this.tree.value; }
});

/*
 * Iterates through all the paths of the tree. A path is a sequence of
 * nodes, from root to some leaf node. The path is returned as an array
 * of `value`
 */

Tree.prototype.forEach = function(fn) {
  var self   = this;

  if(!this.children.length) return [this.value];

  this.leaves.forEach(function(leaf) {
    var curr = leaf,
        path = [];

    while(curr.parent) {
      path.push(curr.value);
      curr = curr.parent;
    }

    fn(path.reverse());
  });
};

/*
 * Simply, adds a node as a child of the current one
 */

Tree.prototype.addNode = function(value) {
  var kid = {
    parent  : this.tree,
    value   : value,
    traverse: 0,
    children: []
  };

  this.leaves.push(kid);
  if(~this.leaves.indexOf(this.tree)) {
    this.leaves.splice(this.leaves.indexOf(this.tree), 1);
  }
  this.tree.children.push(kid);

  return this;
};

/*
 * Adds node and then gets it
 */

Tree.prototype.pushNode = function(value) {
  this.addNode(value);
  this.get(value);
}

/*
 * Deletes a child node of the current one. Value
 * is the `value` of the child.
 */

Tree.prototype.deleteNode = function(value) {
  for(var i = 0; i < this.tree.children.length; i++) {
    if(this.tree.children[i].value === value) {
      this.tree.children.splice(i, 1);
      return this;
    }
  }

  return null;
};

/*
 * Sets the current node to the child one having the
 * specified `value`
 */

Tree.prototype.get = function(value) {
  for(var i = 0; i < this.tree.children.length; i++) {
    if(this.tree.children[i].value === value) {
      this.tree = this.tree.children[i];
      return this;
    }
  }

  return null;
};

/*
 * Goes up one level in the tree
 */

Tree.prototype.up = function() {
  if(!this.tree.parent) return this;

  this.tree = this.tree.parent;

  return this;
}

/*
 * Moves to the root of the tree
 */

Tree.prototype.root = function() {
  while(this.tree.parent) {
    this.up();
  }

  return this;
}

/*
 * Returns an array with all the paths of the tree
 */

Tree.prototype.toArray = Tree.prototype.toJSON = function() {
  var arr = [];
  this.forEach(function(path) {
    arr.push(path);
  });

  return arr;
}

/*
 * Creates a tree starting from a JSON or Array structure
 */

tree.fromJSON = tree.fromArray = function(obj) {
  var t = tree.createTree();

  if(typeof obj === 'string') {
    obj = JSON.parse(obj);
  }


  obj.forEach(function(path) {
    (function iterate(what) {
      what = _.clone(what);

      var next = what.shift();

      if(!next) { return; }
      if(next === 'ROOT') { return iterate(what); }

      if(!t.get(next)) {
        t.addNode(next).get(next);
      }

      return iterate(what);
    })(path);
    t.root();
  });

  return t;
}

/*
 * Helper to create Trees
 */

tree.createTree = function() {
  return new Tree();
}
