var Path = require('path');
var fs = require('fs');
var slash = require('slash');

var BowerCollector = function() {
};

BowerCollector.prototype.collect = function(options) {
  var bowerrcPath = Path.join(options.bowerrc) || process.cwd();
  var bowerrc = fs.existsSync(bowerrcPath) ? JSON.parse(fs.readFileSync(bowerrcPath)) : {};
  var bowerCwd = bowerrc.cwd ? Path.join(bowerrcPath, bowerrc.cwd) : bowerrcPath;
  var directoryPath = Path.join(bowerCwd, bowerrc.directory || 'bower_components');
  var packages = {};
  fs.readdirSync(directoryPath).forEach(function(dir) {
    var dirPath = path.join(directoryPath, dir);
    var bowerJsonPath = path.join(dirPath, 'bower.json');
    if(fs.stat().isDirectory(dirPath) && fs.existsSync(bowerJsonPath)) {
      var bowerJson = fs.readFileSync(bowerJsonPath);
      if(bowerJson.main) {
        var mainPath = slash(path.join(dirPath, bowerJson.main));
        packages[dir] = {
          path: mainPath,
          bowerJson: bowerJson
        };
      }
    }
  });
  return packages;
};


module.exports = BowerCollector;