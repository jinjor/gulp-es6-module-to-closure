var esprima = require('esprima-fb');
var Converter = require('../lib/converter.js');

describe('converter', function() {

  it('works', function() {
    var s = new Converter(esprima).convert('import foo from "bar.js"');
    expect(s.indexOf('goog.require') >= 0).toBe(true);
  });
});