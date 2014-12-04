var escodegen = require('escodegen');
var esprima = require('esprima-fb');
var Path = require('path');
var slash = require('slash');

var CodeGenerator = function(pathResolver) {
  this._pathResolver = pathResolver;
};

CodeGenerator.prototype._joinNameSpace = function(namespace, path, importPath) {

  var dir = path.substring(0, path.lastIndexOf('/'));
  var additional;
  if (importPath) {
    additional = this._pathResolver.resolve(dir, importPath);
    additional = slash(additional);
    additional = additional.substring(0, additional.lastIndexOf('/'))
  } else {
    additional = dir;
  }
  additional = additional.split('/').join('.');
  return additional ? namespace + '.' + additional : namespace;
};

// (a.b.c, foo/bar/baz.js, Baz) => a.b.c.foo.bar.Baz
CodeGenerator.prototype._joinName = function(namespace, path, importPath, name) {
  var longns = this._joinNameSpace(namespace, path, importPath);
  return longns ? longns + '.' + name : name;
};


CodeGenerator.prototype.generate = function(info, namespace) {

  // var base = pathResolver
  var fixProvide = '';
  var fixRequire = '';
  var header = '';
  for (var i = 0, len = info.header.provide.length; i < len; i++) {
    var provide = info.header.provide[i];

    var longName = this._joinName(namespace, info.path, null, provide.name);

    header += 'goog.provide("' + longName + '");\n';
    if (provide.right) {
      var right = escodegen.generate(provide.right);
      fixProvide += longName + ' = ' + right + ';\n';
    }
  }
  for (var i = 0, len = info.header.require.length; i < len; i++) {
    var require = info.header.require[i];

    var longName = this._joinName(namespace, info.path, require.path, require.name);

    fixRequire += 'var ' + require.name + ' = ' + longName + ';\n'

    header += 'goog.require("' + longName + '");\n';
  }
  var inner = escodegen.generate(info.ast);
  var scope = 'goog.scope(function(){\n' + fixRequire + fixProvide + inner + '\n});\n';

  return header + scope;
};

module.exports = CodeGenerator;