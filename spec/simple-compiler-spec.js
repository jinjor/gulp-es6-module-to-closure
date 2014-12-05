
var Compiler = require('../lib/simple-compiler.js');

describe('compiler', function() {

  it('can compile import', function() {
    var c = new Compiler();
    var s = c.compile('import {foo,bar} from "foo.js";', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.require') >= 0).toBe(true);
    expect(s.indexOf('name.space.foo') >= 0).toBe(true);
    expect(s.indexOf('name.space.bar') >= 0).toBe(true);
  });
  it('can compile import 2', function() {
    var c = new Compiler();
    var s = c.compile('import Baz from "./foo/bar/baz.js";', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.require') >= 0).toBe(true);
    expect(s.indexOf('name.space.foo.bar.Baz') >= 0).toBe(true);//TODO add more tests
  });

  it('can compile import 3', function() {
    var c = new Compiler();
    var s = c.compile('import {foo,bar} from "foo.js";', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.require') >= 0).toBe(true);
    expect(s.indexOf('name.space.foo') >= 0).toBe(true);
    expect(s.indexOf('name.space.bar') >= 0).toBe(true);
  });

  it('can compile default import', function() {
    var c = new Compiler();
    var s = c.compile('import Bar from "bar.js";import Foo from "foo.js";', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.require') >= 0).toBe(true);
    expect(s.indexOf('name.space.Bar') >= 0).toBe(true);
    expect(s.indexOf('name.space.Foo') >= 0).toBe(true);
  });

  it('can compile export (VariableDeclaration)', function() {
    var c = new Compiler();
    var s = c.compile('export var foo = "Foo";', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('name.space.foo') >= 0).toBe(true);
    expect(s.indexOf('Foo') >= 0).toBe(true);
  });
  it('can compile export (FunctionDeclaration)', function() {
    var c = new Compiler();
    var s = c.compile('export default function f(a) { console.log(a); };', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('name.space.f') >= 0).toBe(true);
    expect(s.indexOf('console.log') >= 0).toBe(true);
  });
  it('can compile export 3', function() {
    var c = new Compiler();
    var s = c.compile('export { foo, bar };', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('foo') >= 0).toBe(true);
    expect(s.indexOf('bar') >= 0).toBe(true);
  });

  it('can compile default export', function() {
    var c = new Compiler();
    var s = c.compile('export default Foo;', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('name.space.Foo') >= 0).toBe(true);
    expect(s.indexOf('name.space.Foo = Foo') >= 0).toBe(true);
  });

  it('must keep comments', function() {
    var c = new Compiler();
    var s = c.compile('/*comment*/', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('comment') >= 0).toBe(true);
  });

});