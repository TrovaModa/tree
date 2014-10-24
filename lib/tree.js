var _ = require('lodash');

var tree = exports;

function Tree() {
  this.tree = {
    parent   : null,
    value    : 'ROOT',
    children : []
  };

  this.iterations = 1;
}

Object.defineProperty(Tree.prototype, 'children', {
  get: function() {
    return this.tree.children.map(function(i) { return i.value; });
  }
});

Object.defineProperty(Tree.prototype, 'value', {
  get: function() { return this.tree.value; }
});

Tree.prototype.forEach = function(fn) {
  var self   = this;

  if(!this.children.length) return [this.value];

  (function iterate(arr) {
    arr.push(self.value);
    if(!self.children.length) {
      fn(arr.slice(0));
    }
    for(var i = 0; i < self.children.length; i++) {
      self.get(self.children[i]);
      iterate(arr);
      self.up();
      arr.pop();
    }
  })([]);
};

Tree.prototype.addNode = function(value) {
  this.tree.children.push({
    parent  : this.tree,
    value   : value,
    traverse: 0,
    children: []
  });

  return this;
};

Tree.prototype.deleteNode = function(value) {
  for(var i = 0; i < this.tree.children.length; i++) {
    if(this.tree.children[i].value === value) {
      this.tree.children.splice(i, 1);
      return this;
    }
  }

  return null;
};

Tree.prototype.get = function(value) {
  for(var i = 0; i < this.tree.children.length; i++) {
    if(this.tree.children[i].value === value) {
      this.tree = this.tree.children[i];
      return this;
    }
  }

  return null;
};

Tree.prototype.up = function() {
  if(!this.tree.parent) return this;

  this.tree = this.tree.parent;

  return this;
}

Tree.prototype.root = function() {
  while(this.tree.parent) {
    this.up();
  }

  return this;
}

Tree.prototype.toArray = Tree.prototype.toJSON = function() {
  var arr = [];
  this.forEach(function(path) {
    arr.push(path);
  });

  return arr;
}

tree.fromJSON = tree.fromArray = function(obj) {
  t = tree.createTree();

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

tree.createTree = function() {
  return new Tree();
}
