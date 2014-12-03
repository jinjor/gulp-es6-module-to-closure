var esprima = require('esprima-fb');
var Compiler = require('../lib/compiler.js');

var c = new Compiler(esprima)

describe('converter', function() {

  it('can compile import', function() {
    var s = c.compile('import {foo,bar} from "foo.js";', 'name.space');
    console.log(s);
    expect(s.indexOf('goog.require') >= 0).toBe(true);
    expect(s.indexOf('name.space.foo') >= 0).toBe(true);
    expect(s.indexOf('name.space.bar') >= 0).toBe(true);
  });
  it('can compile default import', function() {
    var s = c.compile('import Bar from "bar.js";import Foo from "foo.js";', 'name.space');
    console.log(s);
    expect(s.indexOf('goog.require') >= 0).toBe(true);
    expect(s.indexOf('name.space.Bar') >= 0).toBe(true);
  });

  it('can compile default export', function() {
    var s = c.compile('export default "Foo";export default "Bar";', 'name.space');
    console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('name.space.Foo') >= 0).toBe(true);
    expect(s.indexOf('name.space.Bar') >= 0).toBe(true);
  });
});