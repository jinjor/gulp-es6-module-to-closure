var gulp = require('gulp');
var gulpEs6ModuleToClosure = require('../index.js');

gulp.task('prepare', function() {
  return gulp.src('fixtures/src/**/*.js')
    .pipe(gulpEs6ModuleToClosure({
      root: 'fixtures/src',
      namespace: 'com.xxx'
    }))
    .pipe(gulp.dest('fixtures/dist'));
});