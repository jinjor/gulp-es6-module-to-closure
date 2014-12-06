gulp-es6-module-to-closure
==========================

[![Build Status](https://travis-ci.org/jinjor/gulp-es6-module-to-closure.svg?branch=master)](https://travis-ci.org/jinjor/gulp-es6-module-to-closure)
[![Coverage Status](https://coveralls.io/repos/jinjor/gulp-es6-module-to-closure/badge.png?branch=master)](https://coveralls.io/r/jinjor/gulp-es6-module-to-closure?branch=master)



## WARNING

__All versions are now deprecated.__
__Because some implementations are different from ES6 draft spec.__


------------


compile import/export => goog.require/goog.provide

__Caution:__ Currently, this plugin supports only simple patterns.
Namespaces are determined by thier directories.


## Install

```shell
npm install gulp-es6-module-to-closure --save-dev
```


## Usage

```javascript
var es6ModuleToClosure = require("gulp-es6-module-to-closure");

gulp.src("./src/**/*.js")
  .pipe(es6ModuleToClosure({
    namespace: "prefix.name.space"
  }))
  .pipe(gulp.dest("./dist"));
```


## Example

### export

Compiling `${srcDir}/ns/export.js`
```javascript
export var foo = 'FOO';
```
with namespace `com.xxx` will generate
```javascript
goog.provide("com.xxx.ns.foo");
goog.scope(function() {
    com.xxx.ns.foo = 'FOO';
});
```
at `${distDir}/ns/export.js`.


### import

Compiling `${srcDir}/ns/import.js`
```javascript
import foo from './export.js';
```
with namespace `com.xxx` will generate
```javascript
goog.require("com.xxx.ns.foo");
goog.scope(function() {
    var foo = com.xxx.ns.foo;
});
```
at `${distDir}/ns/import.js`.
