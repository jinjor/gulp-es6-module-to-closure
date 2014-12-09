var Path = require('path');
var slash = require('slash');

var PathResolver = function(nameResolver, filenameConverter) {
  this._nameResolver = nameResolver;
  this._fileNameConverter = filenameConverter;
};

PathResolver.prototype.resolve = function(fromPath, path, namespace) {
  var additional;
  if (path.indexOf('.') === 0) {
    return this._resolveFile(fromPath, path, namespace);
  } else {
    return this._resolveName(fromPath, path, namespace);
  }

  
};

PathResolver.prototype._resolveName = function(fromPath, name, namespace) {
  if (!this._nameResolver) {
    throw new Error('Name resolver is not defined.');
  }

  return this._nameResolver.resolve(fromPath, name, namespace);
};
PathResolver.prototype._resolveFile = function(fromPath, path, namespace) {
  var additional = Path.join(fromPath, path);
  additional = slash(additional);
  additional = additional.substring(0, additional.lastIndexOf('.js'));
  additional = additional.split('/');
  additional[additional.length - 1] = this._fileNameConverter.convert(additional[additional.length - 1]);
  additional = additional.join('.')
  return additional ? (namespace ? namespace + '.' : '') + additional : namespace;
};

module.exports = PathResolver;