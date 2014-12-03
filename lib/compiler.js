var escodegen = require('escodegen');

var Compiler = function(esprima) { // various esprima can be work
  this.esprima = esprima;
}

Compiler.prototype.traverseSomething = function(ast, namespace) {
  if (!ast) {

  } else if (Array.isArray(ast)) {
    for (var i = ast.length - 1; i >= 0; i--) {
      var each = ast[i];
      var replace = this.traverseSomething(each, namespace);
      // console.log(replace);
      if (replace !== undefined) {
        if (Array.isArray(replace)) {
          var _rep = [i, 1].concat(replace);
          ast.splice.apply(ast, _rep);
        } else {
          ast[i] = replace;
        }
      }
    }
  } else {
    var methodName = 'traverse' + ast.type;
    var method = this[methodName];

    if (method) {
      var replace = method.apply(this, [ast, namespace]);
      if (replace) {
        return replace;
      }
    } else if (typeof ast === 'object') {
      Object.keys(ast).forEach(function(key) {
        if (key !== 'type') {
          var replace = this.traverseSomething(ast[key], namespace);
          if (replace !== undefined) {
            ast[key] = replace;
          }
        }
      }.bind(this));
    } else {

    }
  }
};

Compiler.prototype.traverseImportDeclaration = function(ast, namespace) {
  // console.log(JSON.stringify(ast, null, 5));

  var outs = [];
  for (var i = 0, len = ast.specifiers.length; i < len; i++) {
    var specifier = ast.specifiers[i];

    var name = specifier.id.name;
    var file = ast.source.value;
    var out = this.esprima.parse('goog.require("' + namespace + '.' + name + '");');
    outs[i] = out;
  }

  return outs;
}
Compiler.prototype.traverseExportDeclaration = function(ast, namespace) {
  console.log(JSON.stringify(ast, null, 5));
  if (ast.declaration.type === 'VariableDeclaration') {
    var dec = ast.declaration.declarations[0];//FIXME
    var name = dec.id.name;
    var right = escodegen.generate(dec.init);
    return [
      this.esprima.parse('goog.provide("' + namespace + '.' + name + '");'),
      this.esprima.parse(namespace + '.' + name + ' = ' + right + ';'),
    ];
  } else {
    if (ast.declaration.type !== 'Identifier') {
      throw new Error('not supported');
    }
    var name = ast.declaration.name;
    return this.esprima.parse('goog.provide("' + namespace + '.' + name + '");');
  }

}


Compiler.prototype.compile = function(s, namespace) {
  var ast = this.esprima.parse(s, {
    // loc: true,
    // range: true,
    // raw: true,
    // tokens: true,
    // comment: true,
    // tolerant: true,
  });

  this.traverseSomething(ast, namespace);
  // console.log(JSON.stringify(ast, null, 5));

  return escodegen.generate(ast);
};

module.exports = Compiler;