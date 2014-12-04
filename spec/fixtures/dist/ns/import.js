goog.provide("name.space.ns.bar");
goog.require("name.space.ns.foo");
goog.scope(function(){
var foo = name.space.ns.foo;
console.log(foo);
});
