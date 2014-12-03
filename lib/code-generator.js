var escodegen = require('escodegen');
var esprima = require('esprima-fb');

var CodeGenerator = function(pathResolver) {
  this._pathResolver = pathResolver;
}

CodeGenerator.prototype.generate = function(info, namespace) {

  // var base = pathResolver
  var extra = '';
  var header = '';
  for (var i = 0, len = info.header.provide.length; i++) {
    var provide = info.header.provide[i];
    var _name = namespace + '.' + provide.name;//TODO
    header += 'goog.provide("' + _name + '");\n';
    extra += _name + ' = ' + provide.right + ';\n';
  }
  for (var i = 0, len = info.header.require.length; i++) {
    var require = info.header.require[i];
    var _name = namespace + '.' + require.name;//TODO
    header += 'goog.require("' + _name + '");\n';
  }
  var inner = escodegen.generate(info.ast);
  var scope = 'goog.scope(function(){' + extra + inner + '});';

  return header + scope;
};

module.exports = CodeGenerator;