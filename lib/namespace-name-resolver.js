var Path = require('path');
var slash = require('slash');

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

var NamespaceNameResolver = function(fileNameConverter, namespace) {
  this._fileNameConverter = fileNameConverter;
  this._namespace = namespace;
}

DefaultNameResolver.prototype.resolve = function(fromPath, name, namespace) {
  if(!endsWith(name, '.js')) {
    name += '.js';
  }
  var additional = Path.join(fromPath, name);
  additional = slash(additional);
  additional = additional.substring(0, additional.lastIndexOf('.js'));
  additional = additional.split('/');
  additional[additional.length - 1] = this._fileNameConverter.convert(additional[additional.length - 1]);
  additional = additional.join('.');
  namespace = this._namespace;//override
  return additional ? (namespace ? namespace + '.' : '') + additional : namespace;
};
module.exports = DefaultNameResolver;