var escodegen = require('escodegen');

var Compiler = function(esprima) { // various esprima can be work
  this.esprima = esprima;
}

Compiler.prototype.traverseSomething = function(ast) {
  if (!ast) {

  } else if (Array.isArray(ast)) {
    for (var i = 0, len = ast.length; i < len; i++) {
      var each = ast[i];
      var replace = this.traverseSomething(each);
      console.log(replace);
      if (replace !== undefined) {
        ast[i] = replace;
      }
    }
  } else {
    var methodName = 'traverse' + ast.type;
    var method = this[methodName];

    if (method) {
      var replace = method.apply(this, [ast]);
      if (replace) {
        return replace;
      }
    } else if (typeof ast === 'object') {
      Object.keys(ast).forEach(function(key) {
        if (key !== 'type') {
          var replace = this.traverseSomething(ast[key]);
          if (replace !== undefined) {
            ast[key] = replace;
          }
        }
      }.bind(this));
    } else {

    }
  }
};

Compiler.prototype.traverseImportDeclaration = function(ast) {
  return this.esprima.parse('goog.require("hoge");');
}
Compiler.prototype.traverseExportDeclaration = function(ast) {
  return this.esprima.parse('goog.provide("hoge");');
}

Compiler.prototype.compile = function(s) {
  var ast = this.esprima.parse(s, {
    // loc: true,
    // range: true,
    // raw: true,
    // tokens: true,
    // comment: true,
    // tolerant: true,
  });

  this.traverseSomething(ast);
  console.log(JSON.stringify(ast, null, 5));

  return escodegen.generate(ast);
};

module.exports = Compiler;