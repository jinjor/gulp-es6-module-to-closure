var gulp = require('gulp');
var gulpEs6ModuleToClosure = require('../index.js');

gulp.task('p1', function() {
  return gulp.src('fixtures/src/**/*.js')
    .pipe(gulpEs6ModuleToClosure({
      root: 'fixtures/src',
      namespace: 'com.xxx'
    }))
    .pipe(gulp.dest('fixtures/dist'));
});

gulp.task('p2', function() {
  return gulp.src('fixtures2/src/**/*.js')
    .pipe(gulpEs6ModuleToClosure({
      root: 'fixtures2/src'
    }))
    .pipe(gulp.dest('fixtures2/dist'));
});

gulp.task('prepare', ['p1', 'p2']);