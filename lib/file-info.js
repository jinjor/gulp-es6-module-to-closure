var fs = require('fs');
var Promise = require('es6-promise').Promise;

var FileInfo = function(compiler) {
  this._compiler = compiler;
  this._files = {};
}

FileInfo.prototype.data = function(path) {
  if (this._files[path]) {
    return this._files[path];
  }
  this._files[path] = new Promise(function(resolve, reject) {

    fs.readFile(path, function(err, text) {
      if (err) {
        reject(err);
      } else {
        var namespace = '.';//FIXME
        this._compiler.compile(text, namespace, function(data) {
          resolve(data);
        });
      }

    }.bind(this));
  }.bind(this));

  return this._files[path];
};

module.exports = FileInfo;