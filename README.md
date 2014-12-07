gulp-es6-module-to-closure
==========================

[![Build Status](https://travis-ci.org/jinjor/gulp-es6-module-to-closure.svg?branch=master)](https://travis-ci.org/jinjor/gulp-es6-module-to-closure)
[![Coverage Status](https://coveralls.io/repos/jinjor/gulp-es6-module-to-closure/badge.png?branch=master)](https://coveralls.io/r/jinjor/gulp-es6-module-to-closure?branch=master)


compile ES6 `import/export` => Google Closure `goog.require/goog.provide`

__Attention:__ For supporting ES6 features, some special rules are introduced.
See examples below, especially if you use translated library from existing code.


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

- Compiling `${srcDir}/ns/file-name.js`
  ```javascript
export var foo = 'FOO';
```
  with namespace `com.xxx` will generate
  ```javascript
goog.provide("com.xxx.ns.filename.foo");
goog.scope(function() {
    com.xxx.ns.filename.foo = 'FOO';
});
```
at `${distDir}/ns/file-name.js`.


- Compiling `${srcDir}/ns/file-name.js`
  ```javascript
export default 'FOO';
```
  with namespace `com.xxx` will generate
  ```javascript
goog.provide("com.xxx.ns.filename.$default");
goog.scope(function() {
    com.xxx.ns.filename.$default = 'FOO';
});
```
  at `${distDir}/ns/file-name.js`.


### import

- Compiling `${srcDir}/ns/app.js`
  ```javascript
import {foo} from './file-name.js';
```
  with namespace `com.xxx` will generate
  ```javascript
goog.require("com.xxx.ns.filename.foo");
goog.scope(function() {
    var foo = com.xxx.ns.filename.foo;
});
```
  at `${distDir}/ns/app.js`.


- Compiling `${srcDir}/ns/app.js`
  ```javascript
import foo from './file-name.js';
```
  with namespace `com.xxx` will generate
  ```javascript
goog.require("com.xxx.ns.filename.$default");
goog.scope(function() {
    var foo = com.xxx.ns.filename.$default;
});
```
  at `${distDir}/ns/app.js`.


### Migration

#### v0.x.x => v1.x.x

Reference from manual code to generated code is changed.

Before:
```
goog.require('name.space.varName');
```
After:
```
goog.require('name.space.fileName.varName');
```

