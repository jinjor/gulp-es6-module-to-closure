var esprima = require('esprima-fb');
var HeaderExtractor = require('../lib/header-extractor.js');

describe('header-extractor', function() {

  it('can extract import', function() {
    var c = new HeaderExtractor();
    var ast = esprima.parse('import {foo,bar} from "foo.js";');
    var header = c.extract(ast);
    expect(header.require[0].importName === 'foo' || header.require[0].importName === 'bar').toBe(true);
    expect(header.require[0].moduleRequest).toBe('foo.js');
    expect(header.require[1].importName === 'foo' || header.require[1].importName === 'bar').toBe(true);
    expect(header.require[1].moduleRequest).toBe('foo.js');
  });
  it('can extract import 2', function() {
    var c = new HeaderExtractor();
    var ast = esprima.parse('import {Baz} from "foo/bar/baz.js";');
    var header = c.extract(ast);
    expect(header.require[0].importName).toBe('Baz');
    expect(header.require[0].moduleRequest).toBe('foo/bar/baz.js');
  });
  it('can extract import 3', function() {
    var c = new HeaderExtractor();
    var ast = esprima.parse('import {Bar} from "bar.js";import {Foo} from "foo.js";');
    var header = c.extract(ast);
    expect(header.require[0].importName === 'Bar' || header.require[0].importName === 'Foo').toBe(true);
    expect(header.require[0].moduleRequest === 'bar.js' || header.require[0].moduleRequest === 'foo.js').toBe(true);
    expect(header.require[1].importName === 'Bar' || header.require[1].importName === 'Foo').toBe(true);
    expect(header.require[1].moduleRequest === 'bar.js' || header.require[1].moduleRequest === 'foo.js').toBe(true);
  });

  it('can extract export', function() {
    var c = new HeaderExtractor();
    var header = c.extract(esprima.parse('export var foo = "Foo";'));
    expect(header.provide[0].exportName).toBe('foo');
  });
  it('can extract default export', function() {
    var c = new HeaderExtractor();
    var ast = esprima.parse('export default Foo;');
    var header = c.extract(ast);
    expect(header.provide[0].exportName).toBe('default');
  });

});