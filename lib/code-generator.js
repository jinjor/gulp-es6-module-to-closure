var escodegen = require('escodegen');
var Path = require('path');
var slash = require('slash');
var esprima = require('esprima-fb');
var beautify = require('js-beautify');

var CodeGenerator = function(pathResolver, fileNameConverter) {
  this._pathResolver = pathResolver;
  this._fileNameConverter = fileNameConverter;
};

CodeGenerator.prototype._joinNameSpace = function(namespace, path, importPath) {

  var dir = path.substring(0, path.lastIndexOf('/'));
  var additional;
  if (importPath) {
    return this._pathResolver.resolve(dir, importPath, namespace);
  } else {
    additional = path.substring(0, path.lastIndexOf('.js'));
    additional = additional.split('/');
    additional[additional.length - 1] = this._fileNameConverter.convert(additional[additional.length - 1]);
    additional = additional.join('.');
    return additional ? (namespace ? namespace + '.' : '') + additional : namespace;
  }

};

// (a.b.c, foo/bar/baz.js, Baz) => a.b.c.foo.bar.Baz
CodeGenerator.prototype._joinName = function(namespace, path, importPath, exportName) {
  var longns = this._joinNameSpace(namespace, path, importPath);
  return longns + (exportName === '*' ? '' : '.' + exportName);
};


CodeGenerator.prototype.generate = function(info, namespace) {
  info.ast = escodegen.attachComments(info.ast, info.ast.comments, info.ast.tokens);
  var fixProvide = '';
  var fixRequire = '';
  var header = '';

  var longName = this._joinName(namespace, info.path, null, '*');
  header += 'goog.provide("' + longName + '");\n';


  for (var i = 0, len = info.header.provide.length; i < len; i++) {
    var provide = info.header.provide[i];

    var longName = this._joinName(namespace, info.path, null, provide.exportName);

    header += 'goog.provide("' + longName + '");\n';

    if (provide.localName === '*default*') {
      fixProvide += longName + ' = ' + escodegen.generate(provide.right, {
        comment: true
      });
    } else if (provide.right) {
      var right = escodegen.generate(provide.right, {
        comment: true
      });
      fixProvide += right + ';\n';
      fixProvide += longName + ' = ' + provide.localName + ';\n';
    } else {
      fixProvide += longName + ' = ' + provide.exportName + ';\n';
    }
  }
  header += '\n';
  for (var i = 0, len = info.header.require.length; i < len; i++) {
    var require = info.header.require[i];
    var longName = this._joinName(namespace, info.path, require.moduleRequest, require.importName);

    fixRequire += 'var ' + (require.localName || require.importName) + ' = ' + longName + ';\n'

    header += 'goog.require("' + longName + '");\n';
  }
  header += len ? '\n' : '';

  var inner = escodegen.generate(info.ast, {
    comment: true
  }) + '\n';
  var scope = 'goog.scope(function(){\n' + fixRequire + inner + fixProvide + '});\n';

  return beautify(header + scope);
};


module.exports = CodeGenerator;