var fs = require('fs');
var esprima = require('esprima-fb');
var Promise = require('es6-promise').Promise;

var FileInfo = function(compiler, sync) {
  this._compiler = compiler;
  this._sync = sync;
  this._files = {};
}

FileInfo.prototype._load = function(path, resolve, reject) {

  if (this._sync) {
    try {
      var text = fs.readFileSync(path);
      var ast = esprima.parse(text);
      var header = this._compiler.getHeader(ast);
      resolve({
        ast: ast,
        header: header,
        path: path
      });
    } catch (e) {
      reject(e);
    }
  } else {
    fs.readFile(path, function(err, text) {
      if (err) {
        reject(err);
      } else {
        var ast = esprima.parse(text);
        var header = this._compiler.getHeader(ast);
        resolve({
          ast: ast,
          header: header,
          path: path
        });
      }

    }.bind(this));
  }

};

FileInfo.prototype.get = function(path) {
  if (this._files[path]) {
    return this._files[path];
  }
  this._files[path] = new Promise(function(resolve, reject) {
    this._load(path, resolve, reject);
  }.bind(this));

  return this._files[path];
};

module.exports = FileInfo;