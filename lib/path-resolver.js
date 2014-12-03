var Path = require('path');

var PathResolver = function(nameResolver) {
  this._nameResolver = nameResolver;
}

PathResolver.prototype.resolve = function(fromPath, path) {
  if (path.indexOf('.') === 0) {
    return this._resolveFile(fromPath, path);
  } else {
    return this._resolveName(fromPath, path);
  }
};

PathResolver.prototype._resolveName = function(fromPath, name) {
  if (!this._nameResolver) {
    throw new Error('Name resolver is not defined.');
  }
  return this._nameResolver.resolve(fromPath, name);
};
PathResolver.prototype._resolveFile = function(fromPath, path) {
  return Path.join(fromPath, path);
};

module.exports = PathResolver;