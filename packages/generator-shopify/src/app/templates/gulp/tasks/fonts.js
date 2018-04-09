const gulp = require('gulp')
const config = require('../gulp.config')

gulp.task('fonts', function () {
  return gulp.src(config.src.fonts)
    .pipe(gulp.dest(config.theme + '/assets'))
})
