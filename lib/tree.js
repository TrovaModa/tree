var tree = exports;

function Tree() {
  this.tree = {
    parent   : null,
    value    : null,
    children : []
  };
}

Object.defineProperty(Tree.prototype, 'children', {
  get: function() {
    return this.tree.children.map(function(i) { return i.value; });
  }
});

Tree.prototype.addNode = function(value) {
  this.tree.children.push({
    parent  : this.tree,
    value   : value,
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

tree.createTree = function() {
  return new Tree();
}
