goog.provide("name.space.bar");
goog.require("name.space.foo");
goog.scope(function(){
var foo = name.space.foo;
console.log(foo);
});
