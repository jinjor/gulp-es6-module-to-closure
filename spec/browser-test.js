goog.require('com.xxx.export.foo');
goog.require('com.xxx.import.bar');
goog.require('com.xxx.export2.foo');
goog.require('com.xxx.ns.export.foo');
goog.require('com.xxx.ns.import.bar');


describe('index.js', function() {

  it('create closure-formatted .js files', function() {
    expect(com.xxx.export.foo).toBe('FOO');
    expect(com.xxx.import.bar).toBe('FOOBAR');
    expect(com.xxx.ns.export.foo).toBe('FOO');
    expect(com.xxx.ns.import.bar).toBe('FOOBAR');
    expect(typeof com.xxx.export2.foo).toBe('function');// for #18
  });

});