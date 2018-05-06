const gulp = require('gulp')
const { src, dist } = require('../config')

gulp.task('fonts', () =>
  gulp.src(`${src}/assets/fonts/**/*`)
    .pipe(gulp.dest(`${dist}/assets/fonts`))
)
