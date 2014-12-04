gulp-es6-module-to-closure
==========================

[![Build Status](https://travis-ci.org/jinjor/gulp-es6-module-to-closure.svg?branch=master)](https://travis-ci.org/jinjor/gulp-es6-module-to-closure)

compile import/export => goog.require/goog.provide

__Caution:__ Currently, this plugin supports only simple patterns.
Namespaces are determined by thier directories.


## Install

`npm install` will comming soon.
```shell
npm install --save-dev git://github.com/jinjor/gulp-es6-module-to-closure.git#master
```


## Usage

Then, add it to your `gulpfile.js`:

```javascript
var es6ModuleToClosure = require("gulp-es6-module-to-closure");

gulp.src("./src/**/*.js")
  .pipe(es6ModuleToClosure({
    namespace: "name.space"
  }))
  .pipe(gulp.dest("./dist"));
```

