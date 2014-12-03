var gulp = require('gulp');
var gulpEs6ModuleToClosure = require('../index.js');

gulp.task('prepare', function() {
  return gulp.src('fixtures/src/**/*.js')
    .pipe(gulpEs6ModuleToClosure({
      namespace: 'name.space'
    }))
    .pipe(gulp.dest('fixtures/dist'));
});