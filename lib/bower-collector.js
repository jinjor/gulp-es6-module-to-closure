var Path = require('path');
var fs = require('fs');
var slash = require('slash');

var BowerCollector = function() {};

BowerCollector.prototype.collect = function(options) {
  options = options || {};
  var cwd = process.cwd()
  var bowerrcPath = Path.join(cwd, options.bowerrc || '.bowerrc');
  var bowerrc = fs.existsSync(bowerrcPath) ? JSON.parse(fs.readFileSync(bowerrcPath)) : {};
  var bowerCwd = bowerrc.cwd ? Path.join(cwd, bowerrc.cwd) : cwd;
  var directoryPath = Path.join(bowerCwd, bowerrc.directory || 'bower_components');
  var packages = {};
  fs.readdirSync(directoryPath).forEach(function(dir) {
    var dirPath = Path.join(directoryPath, dir);
    var bowerJsonPath = Path.join(dirPath, 'bower.json');
    if (fs.statSync(dirPath).isDirectory() && fs.existsSync(bowerJsonPath)) {
      var bowerJson = JSON.parse(fs.readFileSync(bowerJsonPath));
      if (bowerJson.main) {
        var mainPath = slash(Path.join(dirPath, bowerJson.main));
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