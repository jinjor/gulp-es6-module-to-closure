goog.require('com.xxx.foo');
goog.require('com.xxx.bar');
goog.require('com.xxx.ns.foo');
goog.require('com.xxx.ns.bar');

describe('index.js', function() {

  it('create closure-formatted .js files', function() {
    expect(com.xxx.foo).toBe('FOO');
    expect(com.xxx.bar).toBe('FOOBAR');
    expect(com.xxx.ns.foo).toBe('FOO');
    expect(com.xxx.ns.bar).toBe('FOOBAR');
  });

});