var through = require('through2');
var gutil = require('gulp-util');
var slash = require('slash');
var Path = require('path');
var PluginError = gutil.PluginError;

var esprima = require('esprima-fb');
var Compiler = require('./lib/simple-compiler.js');
var BowerCollector = require('./lib/bower-collector.js');

const PLUGIN_NAME = 'gulp-es6-module-to-closure';

function gulpEs6ModuleToClosure(options) {

  function transform(file, enc, cb) {
    var path = slash(file.path);
    var cwd = slash(file.cwd);
    var root = Path.join(cwd, options.root);
    var relpath = slash(Path.relative(root, path));

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {
      var before = file.contents.toString(enc);
      var after = new Compiler().compile(before, relpath, options.namespace);
      file.contents = new Buffer(after, enc);
    }

    // make sure the file goes through the next gulp plugin
    this.push(file);
    cb();
  }

  function flush(cb) {
    // console.log(files);
    cb();
  }
  return through.obj(transform, flush);
};
module.exports = gulpEs6ModuleToClosure;