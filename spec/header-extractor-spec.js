var esprima = require('esprima-fb');
var Compiler = require('../lib/compiler.js');



describe('compiler', function() {

  it('can compile import', function() {
    var c = new Compiler();
    var s = c.compile(esprima.parse('import {foo,bar} from "foo.js";'), 'name.space');
    console.log(s);
    expect(s.indexOf('goog.require') >= 0).toBe(true);
    expect(s.indexOf('name.space.foo') >= 0).toBe(true);
    expect(s.indexOf('name.space.bar') >= 0).toBe(true);
  });
  it('can compile import 2', function() {
    var c = new Compiler();
    var s = c.compile(esprima.parse('import Baz from "foo/bar/baz.js";'), 'name.space');
    console.log(s);
    expect(s.indexOf('goog.require') >= 0).toBe(true);
    expect(s.indexOf('name.space.foo.bar.Baz') >= 0).toBe(true);
  });
  it('can compile default import', function() {
    var c = new Compiler();
    var s = c.compile(esprima.parse('import Bar from "bar.js";import Foo from "foo.js";'), 'name.space');
    console.log(s);
    expect(s.indexOf('goog.require') >= 0).toBe(true);
    expect(s.indexOf('name.space.Bar') >= 0).toBe(true);
    expect(s.indexOf('name.space.Foo') >= 0).toBe(true);
  });

  it('can compile export', function() {
    var c = new Compiler();
    var s = c.compile(esprima.parse('export var foo = "Foo";'), 'name.space');
    console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('name.space.foo') >= 0).toBe(true);
    expect(s.indexOf('Foo') >= 0).toBe(true);
  });
  it('can compile export 2', function() {
    var c = new Compiler();
    var s = c.compile(esprima.parse('export { foo, bar };'), 'name.space');
    console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('foo') >= 0).toBe(true);
    expect(s.indexOf('bar') >= 0).toBe(true);
  });

  it('can compile default export', function() {
    var c = new Compiler();
    var s = c.compile(esprima.parse('export default Foo;'), 'name.space');
    console.log(s);
    expect(s.indexOf('goog.provide') >= 0).toBe(true);
    expect(s.indexOf('name.space.Foo') >= 0).toBe(true);
  });



  it('can get header import', function() {
    var c = new Compiler();
    var header = c.getHeader(esprima.parse('import {foo,bar} from "foo.js";'));
    console.log(header.require[0].name);
    expect(header.require[0].name === 'foo' || header.require[0].name === 'bar').toBe(true);
    expect(header.require[0].path).toBe('foo.js');
    expect(header.require[1].name === 'foo' || header.require[1].name === 'bar').toBe(true);
    expect(header.require[1].path).toBe('foo.js');
  });
  it('can get header import 2', function() {
    var c = new Compiler();
    var header = c.getHeader(esprima.parse('import Baz from "foo/bar/baz.js";'));
    expect(header.require[0].name).toBe('Baz');
    expect(header.require[0].path).toBe('foo/bar/baz.js');
  });
  it('can get header default import', function() {
    var c = new Compiler();
    var header = c.getHeader(esprima.parse('import Bar from "bar.js";import Foo from "foo.js";'));
    expect(header.require[0].name === 'Bar' || header.require[0].name === 'Foo').toBe(true);
    expect(header.require[0].path === 'bar.js' || header.require[0].path === 'foo.js').toBe(true);
    expect(header.require[1].name === 'Bar' || header.require[1].name === 'Foo').toBe(true);
    expect(header.require[1].path === 'bar.js' || header.require[1].path === 'foo.js').toBe(true);
  });

  it('can get header export', function() {
    var c = new Compiler();
    var header = c.getHeader(esprima.parse('export var foo = "Foo";'));
    expect(header.provide[0].name).toBe('foo');
  });
  it('can get header default export', function() {
    var c = new Compiler();
    var header = c.getHeader(esprima.parse('export default Foo;'));
    expect(header.provide[0].name).toBe('Foo');
  });

});