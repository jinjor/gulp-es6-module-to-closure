var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var esprima = require('esprima-fb');
var Compiler = require('./lib/simple-compiler.js');

// consts
const PLUGIN_NAME = 'gulp-es6-module-to-closure';

function prefixStream(prefixText) {
  var stream = through();
  stream.write(prefixText);
  return stream;
}

// plugin level function (dealing with files)
function gulpPrefixer(options) {
  var prefixText = 'hoge'
  if (!prefixText) {
    throw new PluginError(PLUGIN_NAME, 'Missing prefix text!');
  }

  prefixText = new Buffer(prefixText); // allocate ahead of time

  // creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {
      var before = file.contents.toString('utf8');
      var after = new Compiler().compile(before, options.namespace);
      file.contents = new Buffer(after);
    }

    // make sure the file goes through the next gulp plugin
    this.push(file);

    // tell the stream engine that we are done with this file
    cb();
  });

  // returning the file stream
  return stream;
};

// exporting the plugin main function
module.exports = gulpPrefixer;