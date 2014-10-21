var t      = require('../'),
    expect = require('expect.js');

describe('Tree', function() {
  var tree;

  describe('#createTree', function() {
    it('should create a tree', function() {
      tree = t.createTree();

      expect(tree).to.be.an('object');
      expect(tree.addNode).to.be.a('function');
      expect(tree.deleteNode).to.be.a('function');
      expect(tree.get).to.be.a('function');
      expect(tree.up).to.be.a('function');
    });
  });


  describe('#addNode', function() {
    it('should add a node', function() {
      tree.addNode('HEI');

      expect(tree.tree.children[0].value).to.eql('HEI');
    });
  });

  describe('.children', function() {
    it('should return children', function() {
      expect(tree.children.length).to.eql(1);
    });
  });

  describe('#deleteNode', function() {
    it('should delete a node', function() {
      tree.deleteNode('HEI');

      expect(tree.tree.children.length).to.eql(0);
    });
  });

  describe('#get', function() {
    it('should get a node', function() {
      tree.addNode('HEI').get('HEI');

      expect(tree.tree.children.length).to.eql(0);
      expect(tree.tree.parent).to.be.an('object');
    });
  });

  describe('#up', function() {
    it('should go up a level', function() {
      tree.up();

      expect(tree.tree.parent).to.eql(null);
    });
  });

  describe('#root', function() {
    it('should go to root', function() {
      tree.addNode('HAI').addNode('HEI').addNode('HOLA');

      tree.root();

      expect(tree.tree.parent).to.eql(null);
    });
  });

});
