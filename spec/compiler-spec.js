var esprima = require('esprima-fb');
var Compiler = require('../lib/compiler.js');



describe('converter', function() {

  it('can compile import', function() {
    var c = new Compiler(esprima);
    var s = c.compile('import {foo,bar} from "foo.js";', 'name.space');
    console.log(s);
    expect(s.indexOf('goog.require') >= 0).toBe(true);
    expect(s.indexOf('name.space.foo') >= 0).toBe(true);
    expect(s.indexOf('name.space.bar') >= 0).toBe(true);
  });
  it('can compile import 2', function() {
    var c = new Compiler(esprima);
    var s = c.compile('import Baz from "foo/bar/baz.js";', 'name.space');
    console.log(s);
    expect(s.indexOf('goog.require') >= 0).toBe(true);
    expect(s.indexOf('name.space.foo.bar.Baz') >= 0).toBe(true);
  });
  it('can compile default import', function() {
    var c = new Compiler(esprima);
    var s = c.compile('import Bar from "bar.js";import Foo from "foo.js";', 'name.space');
    console.log(s);
    expect(s.indexOf('goog.require') >= 0).toBe(true);
    expect(s.indexOf('name.space.Bar') >= 0).toBe(true);
    expect(s.indexOf('name.space.Foo') >= 0).toBe(true);
  });
  
  it('can compile export', function() {
    var c = new Compiler(esprima);
    var s = c.compile('export var foo = "Foo";', 'name.space');
    console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('name.space.foo') >= 0).toBe(true);
    expect(s.indexOf('Foo') >= 0).toBe(true);
  });
  it('can compile default export', function() {
    var c = new Compiler(esprima);
    var s = c.compile('export default Foo;', 'name.space');
    console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('name.space.Foo') >= 0).toBe(true);
  });
});