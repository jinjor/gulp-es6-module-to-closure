var PathResolver = require('../lib/path-resolver.js');
var DefaultNameResolver = require('../lib/default-name-resolver.js');

describe('path-resolver', function() {

  it('can resolve path', function() {
    var fr = new PathResolver();
    expect(fr.resolve('./foo', './bar.js')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('./foo/', './bar.js')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('.', './foo/bar.js')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('./', './foo/bar.js')).toBe(fr.resolve('.', './foo/bar.js'));

    expect(fr.resolve('./foo/../foo', './bar.js')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('./foo/../foo/', './bar.js')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('.', './foo/../foo/bar.js')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('./', './foo/../foo/bar.js')).toBe(fr.resolve('.', './foo/bar.js'));

    expect(fr.resolve('../a/foo', './bar.js')).toBe(fr.resolve('../a', './foo/bar.js'));
    expect(fr.resolve('../a/foo/', './bar.js')).toBe(fr.resolve('../a', './foo/bar.js'));
    expect(fr.resolve('../a', './foo/bar.js')).toBe(fr.resolve('../a', './foo/bar.js'));
    expect(fr.resolve('../a/', './foo/bar.js')).toBe(fr.resolve('../a', './foo/bar.js'));

  });
  it('can resolve name(default-name-resolver)', function() {
    var fr = new PathResolver(new DefaultNameResolver());
    expect(fr.resolve('./foo', './bar.js')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('./foo/', './bar.js')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('.', './foo/bar.js')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('./', './foo/bar.js')).toBe(fr.resolve('.', './foo/bar.js'));
    // by name
    expect(fr.resolve('./foo', 'bar.js')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('./foo/', 'bar.js')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('.', 'foo/bar.js')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('./', 'foo/bar.js')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('./foo', '/bar.js')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('./foo/', '/bar.js')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('.', '/foo/bar.js')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('./', '/foo/bar.js')).toBe(fr.resolve('.', './foo/bar.js'));
    // by name without .js
    expect(fr.resolve('./foo', 'bar')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('./foo/', 'bar')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('.', 'foo/bar')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('./', 'foo/bar')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('./foo', '/bar')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('./foo/', '/bar')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('.', '/foo/bar')).toBe(fr.resolve('.', './foo/bar.js'));
    expect(fr.resolve('./', '/foo/bar')).toBe(fr.resolve('.', './foo/bar.js'));
  });

});