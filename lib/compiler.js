var escodegen = require('escodegen');

var Compiler = function(esprima) { // various esprima can be work
  this.esprima = esprima;
}

Compiler.prototype.traverseSomething = function(ast, namespace) {
  if (!ast) {

  } else if (Array.isArray(ast)) {
    for (var i = 0, len = ast.length; i < len; i++) {
      var each = ast[i];
      var replace = this.traverseSomething(each, namespace);
      console.log(replace);
      if (replace !== undefined) {
        ast[i] = replace;
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
  return this.esprima.parse('goog.require("' + namespace + '.' + 'Bar' + '");');
}
Compiler.prototype.traverseExportDeclaration = function(ast, namespace) {
  return this.esprima.parse('goog.provide("' + namespace + '.' + 'Bar' + '");');
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
  console.log(JSON.stringify(ast, null, 5));

  return escodegen.generate(ast);
};

module.exports = Compiler;