
var Compiler = require('../lib/simple-compiler.js');

describe('compiler', function() {

  it('can compile import', function() {
    var c = new Compiler();
    var s = c.compile('import {foo,bar} from "foo.js";', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.require') >= 0).toBe(true);
    expect(s.indexOf('name.space.foo.foo') >= 0).toBe(true);
    expect(s.indexOf('name.space.foo.bar') >= 0).toBe(true);
  });

  it('can compile import(no name space)', function() {
    var c = new Compiler();
    var s = c.compile('import {foo,bar} from "foo.js";', 'sample.js');
    // console.log(s);
    expect(s.indexOf('goog.require') >= 0).toBe(true);
    expect(s.indexOf(' foo.foo') >= 0).toBe(true);
    expect(s.indexOf(' foo.bar') >= 0).toBe(true);
  });
  it('can compile import 2', function() {
    var c = new Compiler();
    var s = c.compile('import {Baz} from "./foo/bar/baz.js";', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.require') >= 0).toBe(true);
    expect(s.indexOf('name.space.foo.bar.baz.Baz') >= 0).toBe(true);//TODO add more tests
  });

  it('can compile import multi', function() {
    var c = new Compiler();
    var s = c.compile('import {foo,bar} from "foo.js";', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.require') >= 0).toBe(true);
    expect(s.indexOf('name.space.foo.foo') >= 0).toBe(true);
    expect(s.indexOf('name.space.foo.bar') >= 0).toBe(true);
  });

  it('can compile import A as B', function() {
    var c = new Compiler();
    var s = c.compile('import {foo as foofoo} from "foo.js";', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.require') >= 0).toBe(true);
    expect(s.indexOf('name.space.foo.foo') >= 0).toBe(true);
    expect(s.indexOf('foofoo = name.space.foo.foo') >= 0).toBe(true);
  });

  it('can compile import 3', function() {
    var c = new Compiler();
    var s = c.compile('import {Bar} from "bar.js";import {Foo} from "foo.js";', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.require') >= 0).toBe(true);
    expect(s.indexOf('name.space.bar.Bar') >= 0).toBe(true);
    expect(s.indexOf('name.space.foo.Foo') >= 0).toBe(true);
  });
  it('can compile default import', function() {
    var c = new Compiler();
    var s = c.compile('import foo from "bar.js";', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.require') >= 0).toBe(true);
    expect(s.indexOf('foo = name.space.bar.') >= 0).toBe(true);
  });
  it('can compile import * as A', function() {
    var c = new Compiler();
    var s = c.compile('import * as foo from "bar.js";', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.require') >= 0).toBe(true);
    expect(s.indexOf('foo = name.space.bar;') >= 0).toBe(true);
  });

  it('can compile export (VariableDeclaration:var)', function() {
    var c = new Compiler();
    var s = c.compile('export var foo = "Foo";', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('name.space.sample.foo') >= 0).toBe(true);
    expect(s.indexOf('Foo') >= 0).toBe(true);
    expect(s.indexOf('var foo =') >= 0).toBe(true);
  });
  it('can compile export (VariableDeclaration:let)', function() {
    var c = new Compiler();
    var s = c.compile('export let foo = "Foo";', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('name.space.sample.foo') >= 0).toBe(true);
    expect(s.indexOf('Foo') >= 0).toBe(true);
    expect(s.indexOf('let foo =') >= 0).toBe(true);
  });
  it('can compile export (VariableDeclaration:const)', function() {
    var c = new Compiler();
    var s = c.compile('export const foo = "Foo";', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('name.space.sample.foo') >= 0).toBe(true);
    expect(s.indexOf('Foo') >= 0).toBe(true);
    expect(s.indexOf('const foo =') >= 0).toBe(true);
  });
  it('can compile export (FunctionDeclaration)', function() {
    var c = new Compiler();
    var s = c.compile('export function f(a) { console.log(a); };', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('name.space.sample.f') >= 0).toBe(true);
    expect(s.indexOf('console.log') >= 0).toBe(true);
  });
  it('can compile export (generator)', function() {
    var c = new Compiler();
    var s = c.compile('export function* gen(a) { yield 1; };', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('name.space.sample.gen') >= 0).toBe(true);
    expect(s.indexOf('function*') >= 0).toBe(true);
    expect(s.indexOf('yield') >= 0).toBe(true);
  });
  it('can compile export (class)', function() {
    var c = new Compiler();
    var s = c.compile('export class Foo { constructor() {} };', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('name.space.sample.Foo') >= 0).toBe(true);
    expect(s.indexOf('class') >= 0).toBe(true);
    expect(s.indexOf('constructor') >= 0).toBe(true);
  });
  it('can compile export multi', function() {
    var c = new Compiler();
    var s = c.compile('export { foo, bar };', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('name.space.sample.foo') >= 0).toBe(true);
    expect(s.indexOf('bar') >= 0).toBe(true);
  });
  it('can compile export A as B', function() {
    var c = new Compiler();
    var s = c.compile('export { foo1 as foo2 };', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('name.space.sample.foo2 = foo1') >= 0).toBe(true);
  });

  it('can compile default export', function() {
    var c = new Compiler();
    var s = c.compile('export default Foo;', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('name.space.sample.default = Foo') >= 0).toBe(true);
  });
  it('can compile default export Number', function() {
    var c = new Compiler();
    var s = c.compile('export default 1;', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('name.space.sample.default = 1') >= 0).toBe(true);
  });
  it('can compile default export string', function() {
    var c = new Compiler();
    var s = c.compile('export default "foo";', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('name.space.sample.default') >= 0).toBe(true);
    expect(s.indexOf('foo') >= 0).toBe(true);
  });
  it('can compile default export function', function() {
    var c = new Compiler();
    var s = c.compile('export default function(a) { console.log(a); };', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('name.space.sample.default = function') >= 0).toBe(true);
  });
  it('can compile default export named function', function() {
    var c = new Compiler();
    var s = c.compile('export default function g(a) { console.log(a); };', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('name.space.sample.default = g') >= 0).toBe(true);
    expect(s.indexOf('function g') >= 0).toBe(true);
  });

  it('must keep comments', function() {
    var c = new Compiler();
    var s = c.compile('/*comment*/', 'sample.js', 'name.space');
    // console.log(s);
    expect(s.indexOf('comment') >= 0).toBe(true);
  });

});