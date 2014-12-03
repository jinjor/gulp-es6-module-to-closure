var esprima = require('esprima-fb');
var Compiler = require('../lib/compiler.js');

describe('converter', function() {

  it('can compile import', function() {
    var s = new Compiler(esprima).compile('import foo from "bar.js"');
    expect(s.indexOf('goog.require') >= 0).toBe(true);
  });
  it('can compile export', function() {
    var s = new Compiler(esprima).compile('export default "foo"');
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
  });
});