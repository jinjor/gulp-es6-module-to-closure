var HeaderExtractor = require('./header-extractor.js');
var CodeGenerator = require('./code-generator.js');
var esprima = require('esprima-fb');


var SimpleCompiler = function() {
  this._headerExtractor = new HeaderExtractor();
  this._codeGenerator = new CodeGenerator();
};

SimpleCompiler.prototype.compile = function(before, namespace) { // contains side effect
  var ast = esprima.parse(before);
  info = {
    ast: ast
  };
  info.header = this._headerExtractor.extract(ast);
  var after = this._codeGenerator.generate(info, namespace);
  return after;
};


module.exports = SimpleCompiler;