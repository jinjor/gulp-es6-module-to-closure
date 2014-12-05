module.exports = function(grunt) {

  grunt.initConfig({
    jasmine: {
      customTemplate: {
        src: 'spec/fixtures/dist/**/*.js',
        options: {
          helpers: 'closure-library/closure/goog/base.js',
          specs: 'spec/browser-test.js',
          template: 'spec/browser-test.tmpl',
          keepRunner: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jasmine');

};