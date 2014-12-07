var esprima = require('esprima-fb');
var HeaderExtractor = require('../lib/header-extractor.js');

describe('header-extractor', function() {

  it('can extract import', function() {
    var c = new HeaderExtractor();
    var ast = esprima.parse('import {foo,bar} from "foo.js";');
    var header = c.extract(ast);
    expect(header.require[0].name === 'foo' || header.require[0].name === 'bar').toBe(true);
    expect(header.require[0].path).toBe('foo.js');
    expect(header.require[1].name === 'foo' || header.require[1].name === 'bar').toBe(true);
    expect(header.require[1].path).toBe('foo.js');
  });
  it('can extract import 2', function() {
    var c = new HeaderExtractor();
    var ast = esprima.parse('import {Baz} from "foo/bar/baz.js";');
    var header = c.extract(ast);
    expect(header.require[0].name).toBe('Baz');
    expect(header.require[0].path).toBe('foo/bar/baz.js');
  });
  it('can extract import 3', function() {
    var c = new HeaderExtractor();
    var ast = esprima.parse('import {Bar} from "bar.js";import {Foo} from "foo.js";');
    var header = c.extract(ast);
    expect(header.require[0].name === 'Bar' || header.require[0].name === 'Foo').toBe(true);
    expect(header.require[0].path === 'bar.js' || header.require[0].path === 'foo.js').toBe(true);
    expect(header.require[1].name === 'Bar' || header.require[1].name === 'Foo').toBe(true);
    expect(header.require[1].path === 'bar.js' || header.require[1].path === 'foo.js').toBe(true);
  });

  it('can extract export', function() {
    var c = new HeaderExtractor();
    var header = c.extract(esprima.parse('export var foo = "Foo";'));
    expect(header.provide[0].name).toBe('foo');
  });
  it('can extract default export', function() {
    var c = new HeaderExtractor();
    var ast = esprima.parse('export default Foo;');
    var header = c.extract(ast);
    expect(header.provide[0].name).toBe('$default');
  });

});