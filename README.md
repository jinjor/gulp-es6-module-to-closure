gulp-es6-module-to-closure
==========================

[![Build Status](https://travis-ci.org/jinjor/gulp-es6-module-to-closure.svg?branch=master)](https://travis-ci.org/jinjor/gulp-es6-module-to-closure)
[![Coverage Status](https://coveralls.io/repos/jinjor/gulp-es6-module-to-closure/badge.png?branch=master)](https://coveralls.io/r/jinjor/gulp-es6-module-to-closure?branch=master)

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

