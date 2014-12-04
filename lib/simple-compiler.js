var HeaderExtractor = require('./header-extractor.js');
var CodeGenerator = require('./code-generator.js');
var PathResolver = require('./path-resolver.js');
var DefaultNameResolver = require('./default-name-resolver.js');
var esprima = require('esprima-fb');


var SimpleCompiler = function() {
  var pathResolver = new PathResolver(new DefaultNameResolver());
  this._headerExtractor = new HeaderExtractor();
  this._codeGenerator = new CodeGenerator(pathResolver);
};

SimpleCompiler.prototype.compile = function(before, relpath, namespace) { // contains side effect
  var ast = esprima.parse(before);
  info = {
    ast: ast,
    path: relpath
  };
  info.header = this._headerExtractor.extract(ast);
  var after = this._codeGenerator.generate(info, namespace);
  return after;
};


module.exports = SimpleCompiler;