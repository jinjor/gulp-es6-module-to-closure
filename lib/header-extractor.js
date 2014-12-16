var esprima = require('esprima-fb');

var HeaderExtractor = function() {}

HeaderExtractor.prototype.traverseSomething = function(ast, header) {
  if (!ast) {

  } else if (Array.isArray(ast)) {
    for (var i = ast.length - 1; i >= 0; i--) {
      var each = ast[i];
      var replace = this.traverseSomething(each, header);
      if (replace) {
        ast.splice.apply(ast, [i, 1]);
      }
    }
  } else {
    var methodName = 'traverse' + ast.type;
    var method = this[methodName];

    if (method) {
      return method.apply(this, [ast, header]);
    } else if (typeof ast === 'object') {
      Object.keys(ast).forEach(function(key) {
        if (key !== 'type') {
          var replace = this.traverseSomething(ast[key], header);
          if (replace) {
            delete ast[key];
          }
        }
      }.bind(this));
    } else {

    }
  }
};

HeaderExtractor.prototype.traverseImportDeclaration = function(ast, header) {

  for (var i = 0, len = ast.specifiers.length; i < len; i++) {
    var specifier = ast.specifiers[i];
    var importNamespace = specifier.type === 'ImportNamespaceSpecifier';

    var isDefualt = specifier.type === 'ImportDefaultSpecifier';
    var path = ast.source.value;
    header.require.push({
      importName: importNamespace ? '*' : (isDefualt ? 'default' : specifier.id.name),
      localName: (importNamespace || isDefualt) ? specifier.id.name : (specifier.name ? specifier.name.name : null),
      moduleRequest: path
    });
  }
  return true;

};
HeaderExtractor.prototype.traverseExportDeclaration = function(ast, header) {
  if (ast.declaration) {
    if (ast.declaration.type === 'FunctionDeclaration') {
      // export default function f() { ... };
      var dec = ast.declaration;
      var name = dec.id.name;
      header.provide.push({
        localName: name,
        exportName: ast.default ? 'default' : name,
        right: dec
      });
    } else if (ast.declaration.type === 'VariableDeclaration') {
      // export var foo = 'foo';
      var dec = ast.declaration.declarations[0]; //FIXME
      var name = dec.id.name;
      header.provide.push({
        localName: name,
        exportName: name,
        right: ast.declaration
      });
    } else {
      // export foo;
      // export default foo;
      var name = ast.declaration.name;
      var localName = (ast.declaration.type === 'Literal' || ast.declaration.type === 'FunctionExpression') ? '*default*' : name
      header.provide.push({
        localName: localName,
        exportName: ast.default ? 'default' : name,
        value: ast.declaration.type === 'Literal' ? ast.declaration.value : null,
        right: ast.default ? ast.declaration : null
      });
    }
  } else {
    // export {foo, bar};
    for (var i = 0, len = ast.specifiers.length; i < len; i++) {
      var specifier = ast.specifiers[i];
      var name = specifier.id.name;
      header.provide.push({
        localName: specifier.id.name,
        exportName: specifier.name ? specifier.name.name : name
      });
    }
    
  }
  return true;
};

HeaderExtractor.prototype.extract = function(ast) { // mutable
  var header = {
    provide: [],
    require: []
  };
  this.traverseSomething(ast, header);
  return header;
};


module.exports = HeaderExtractor;