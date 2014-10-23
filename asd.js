var tree = require('./');

var t = tree.createTree();

t.addNode('HAI').up()
t.addNode('HEI').up()
t.addNode('HOLA').get('HOLA').addNode('HELO').addNode('COCA');
t.get('COCA').addNode('COLA').get('COLA').addNode('PEPSI')
t.root()

console.log(t.traverse())
