var FilenameConverter = function(options) {
  this.options = options;
};

FilenameConverter.prototype.convert = function(filename) { // contains side effect
  return filename;
};

module.exports = FilenameConverter;