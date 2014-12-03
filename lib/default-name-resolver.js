var Path = require('path');

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

var DefaultNameResolver = function(nameResolver) {
  this._nameResolver = nameResolver;
}

DefaultNameResolver.prototype.resolve = function(fromPath, name) {
  if(!endsWith(name, '.js')) {
    name += '.js';
  }
  return Path.join(fromPath, name);
};
module.exports = DefaultNameResolver;