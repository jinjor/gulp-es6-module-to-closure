var through = require('through2');
var gutil = require('gulp-util');
var slash = require('slash');
var Path = require('path');
var PluginError = gutil.PluginError;

var esprima = require('esprima-fb');
var Compiler = require('./lib/simple-compiler.js');

const PLUGIN_NAME = 'gulp-es6-module-to-closure';

// function prefixStream(prefixText) {
//   var stream = through();
//   stream.write(prefixText);
//   return stream;
// }

// plugin level function (dealing with files)
function gulpPrefixer(options) {
  var prefixText = 'hoge'
  if (!prefixText) {
    throw new PluginError(PLUGIN_NAME, 'Missing prefix text!');
  }

  prefixText = new Buffer(prefixText); // allocate ahead of time

  var stream = through.obj(function(file, enc, cb) {
    var path = slash(file.path);
    var cwd = slash(file.cwd);
    var root = Path.join(cwd, options.root);
    var relpath = slash(Path.relative(root, path));
    // console.log(relpath);

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {
      var before = file.contents.toString('utf8');
      var after = new Compiler().compile(before, relpath, options.namespace);
      file.contents = new Buffer(after);
    }

    // make sure the file goes through the next gulp plugin
    this.push(file);
    cb();
  });
  return stream;
};
module.exports = gulpPrefixer;