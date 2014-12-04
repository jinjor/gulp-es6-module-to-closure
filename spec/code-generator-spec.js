
var CodeGenerator = require('../lib/code-generator.js');
var PathResolver = require('../lib/path-resolver.js');
var DefaultNameResolver = require('../lib/default-name-resolver.js');

describe('code-generator', function() {

  it('can generator code', function() {
    var codeGenerator = new CodeGenerator(new PathResolver(new DefaultNameResolver()));

  });

});