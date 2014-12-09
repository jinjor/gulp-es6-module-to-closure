var Path = require('path');
var slash = require('slash');

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

var BowerNameResolver = function(fileNameConverter, bowerCollection, namespace) {
  this._fileNameConverter = fileNameConverter;
  this._bowerCollection = bowerCollection;
  this._namespace = namespace;
}

BowerNameResolver.prototype.resolve = function(fromPath, name, namespace) {
  var info = this.bowerCollection[name];
  if(info) {
    throw new Error(name + ' does not exist.');
  }
  var additional = Path.join(info.path, info.bowerJson.main);

  additional = slash(additional);
  additional = additional.substring(0, additional.lastIndexOf('.js'));
  additional = additional.split('/');
  additional[additional.length - 1] = this._fileNameConverter.convert(additional[additional.length - 1]);
  additional = additional.join('.');
  namespace = this._namespace;//override
  return additional ? (namespace ? namespace + '.' : '') + additional : namespace;
};
module.exports = BowerNameResolver;